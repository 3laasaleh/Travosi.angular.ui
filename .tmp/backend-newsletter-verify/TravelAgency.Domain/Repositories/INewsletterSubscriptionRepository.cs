using TravelAgency.Domain.Entities;

namespace TravelAgency.Domain.Repositories
{
    public interface INewsletterSubscriptionRepository
    {
        Task<bool> ExistsAsync(string normalizedEmail, CancellationToken cancellationToken = default);
        Task<bool> TryAddAsync(NewsletterSubscription subscription, CancellationToken cancellationToken = default);
        Task MarkWelcomeEmailSentAsync(
            int subscriptionId,
            DateTime sentAtUtc,
            CancellationToken cancellationToken = default);
        Task MarkWelcomeEmailAttemptAsync(
            int subscriptionId,
            DateTime attemptedAtUtc,
            CancellationToken cancellationToken = default);
        Task<IReadOnlyList<NewsletterSubscription>> GetPendingWelcomeEmailsAsync(
            DateTime retryBeforeUtc,
            int maxAttempts,
            int take,
            CancellationToken cancellationToken = default);
        Task<bool> TryClaimWelcomeEmailAsync(
            int subscriptionId,
            DateTime? expectedLastAttemptAtUtc,
            DateTime attemptedAtUtc,
            CancellationToken cancellationToken = default);
    }
}
