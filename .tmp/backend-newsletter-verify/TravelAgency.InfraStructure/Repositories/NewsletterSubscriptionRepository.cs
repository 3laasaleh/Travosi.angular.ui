using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Repositories;
using TravelAgency.InfraStructure.Persistence;

namespace TravelAgency.InfraStructure.Repositories
{
    public class NewsletterSubscriptionRepository : INewsletterSubscriptionRepository
    {
        private readonly TravelAgencyContext _db;

        public NewsletterSubscriptionRepository(TravelAgencyContext db)
        {
            _db = db;
        }

        public Task<bool> ExistsAsync(
            string normalizedEmail,
            CancellationToken cancellationToken = default)
            => _db.NewsletterSubscriptions
                .AsNoTracking()
                .AnyAsync(
                    subscription => subscription.NormalizedEmail == normalizedEmail,
                    cancellationToken);

        public async Task<bool> TryAddAsync(
            NewsletterSubscription subscription,
            CancellationToken cancellationToken = default)
        {
            _db.NewsletterSubscriptions.Add(subscription);
            try
            {
                await _db.SaveChangesAsync(cancellationToken);
                return true;
            }
            catch (DbUpdateException exception) when (IsUniqueConstraintViolation(exception))
            {
                _db.Entry(subscription).State = EntityState.Detached;
                if (await ExistsAsync(subscription.NormalizedEmail, cancellationToken))
                    return false;

                throw;
            }
        }

        public Task MarkWelcomeEmailSentAsync(
            int subscriptionId,
            DateTime sentAtUtc,
            CancellationToken cancellationToken = default)
            => _db.NewsletterSubscriptions
                .Where(subscription => subscription.Id == subscriptionId)
                .ExecuteUpdateAsync(
                    setters => setters
                        .SetProperty(subscription => subscription.WelcomeEmailSentAtUtc, sentAtUtc)
                        .SetProperty(subscription => subscription.WelcomeEmailLastAttemptAtUtc, sentAtUtc),
                    cancellationToken);

        public Task MarkWelcomeEmailAttemptAsync(
            int subscriptionId,
            DateTime attemptedAtUtc,
            CancellationToken cancellationToken = default)
            => _db.NewsletterSubscriptions
                .Where(subscription => subscription.Id == subscriptionId)
                .ExecuteUpdateAsync(
                    setters => setters.SetProperty(
                        subscription => subscription.WelcomeEmailLastAttemptAtUtc,
                        attemptedAtUtc),
                    cancellationToken);

        public async Task<IReadOnlyList<NewsletterSubscription>> GetPendingWelcomeEmailsAsync(
            DateTime retryBeforeUtc,
            int maxAttempts,
            int take,
            CancellationToken cancellationToken = default)
            => await _db.NewsletterSubscriptions
                .AsNoTracking()
                .Where(subscription =>
                    subscription.IsActive
                    && subscription.WelcomeEmailSentAtUtc == null
                    && subscription.WelcomeEmailAttemptCount < maxAttempts
                    && (subscription.WelcomeEmailLastAttemptAtUtc == null
                        || subscription.WelcomeEmailLastAttemptAtUtc <= retryBeforeUtc))
                .OrderBy(subscription => subscription.WelcomeEmailLastAttemptAtUtc)
                .ThenBy(subscription => subscription.Id)
                .Take(Math.Clamp(take, 1, 100))
                .ToListAsync(cancellationToken);

        public async Task<bool> TryClaimWelcomeEmailAsync(
            int subscriptionId,
            DateTime? expectedLastAttemptAtUtc,
            DateTime attemptedAtUtc,
            CancellationToken cancellationToken = default)
        {
            var updated = await _db.NewsletterSubscriptions
                .Where(subscription =>
                    subscription.Id == subscriptionId
                    && subscription.IsActive
                    && subscription.WelcomeEmailSentAtUtc == null
                    && subscription.WelcomeEmailLastAttemptAtUtc == expectedLastAttemptAtUtc)
                .ExecuteUpdateAsync(
                    setters => setters
                        .SetProperty(
                            subscription => subscription.WelcomeEmailLastAttemptAtUtc,
                            attemptedAtUtc)
                        .SetProperty(
                            subscription => subscription.WelcomeEmailAttemptCount,
                            subscription => subscription.WelcomeEmailAttemptCount + 1),
                    cancellationToken);

            return updated == 1;
        }

        private static bool IsUniqueConstraintViolation(DbUpdateException exception)
            => exception.InnerException is SqlException sqlException
                && (sqlException.Number == 2601 || sqlException.Number == 2627);
    }
}
