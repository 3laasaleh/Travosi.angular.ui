using TravelAgency.Application.Common.Interfaces;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.API.BackgroundServices
{
    public class NewsletterWelcomeEmailRetryWorker : BackgroundService
    {
        private static readonly TimeSpan PollInterval = TimeSpan.FromMinutes(1);
        private static readonly TimeSpan RetryDelay = TimeSpan.FromMinutes(5);
        private const int BatchSize = 20;
        private const int MaxAttempts = 8;

        private readonly IServiceScopeFactory _scopeFactory;
        private readonly IEmailService _emailService;
        private readonly ILogger<NewsletterWelcomeEmailRetryWorker> _logger;

        public NewsletterWelcomeEmailRetryWorker(
            IServiceScopeFactory scopeFactory,
            IEmailService emailService,
            ILogger<NewsletterWelcomeEmailRetryWorker> logger)
        {
            _scopeFactory = scopeFactory;
            _emailService = emailService;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            using var timer = new PeriodicTimer(PollInterval);
            while (await timer.WaitForNextTickAsync(stoppingToken))
            {
                try
                {
                    await RetryPendingEmailsAsync(stoppingToken);
                }
                catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested)
                {
                    break;
                }
                catch (Exception exception)
                {
                    _logger.LogError(exception, "Newsletter welcome email retry cycle failed");
                }
            }
        }

        private async Task RetryPendingEmailsAsync(CancellationToken cancellationToken)
        {
            using var scope = _scopeFactory.CreateScope();
            var repository = scope.ServiceProvider.GetRequiredService<INewsletterSubscriptionRepository>();
            var retryBeforeUtc = DateTime.UtcNow.Subtract(RetryDelay);
            var pending = await repository.GetPendingWelcomeEmailsAsync(
                retryBeforeUtc,
                MaxAttempts,
                BatchSize,
                cancellationToken);

            foreach (var subscription in pending)
            {
                var attemptedAtUtc = DateTime.UtcNow;
                if (!await repository.TryClaimWelcomeEmailAsync(
                    subscription.Id,
                    subscription.WelcomeEmailLastAttemptAtUtc,
                    attemptedAtUtc,
                    cancellationToken))
                {
                    continue;
                }

                try
                {
                    await _emailService.SendNewsletterWelcomeEmailAsync(subscription.Email, cancellationToken);
                    await repository.MarkWelcomeEmailSentAsync(subscription.Id, DateTime.UtcNow, cancellationToken);
                }
                catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
                {
                    throw;
                }
                catch (Exception exception)
                {
                    _logger.LogError(
                        exception,
                        "Retrying newsletter welcome email failed for subscription {SubscriptionId}",
                        subscription.Id);
                }
            }
        }
    }
}
