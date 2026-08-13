using FluentValidation;
using Microsoft.Extensions.Logging;
using TravelAgency.Application.Common.Interfaces;
using TravelAgency.Application.DTOs.Newsletter;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.Application.Services
{
    public class NewsletterSubscriptionService : INewsletterSubscriptionService
    {
        private readonly INewsletterSubscriptionRepository _repository;
        private readonly IValidator<SubscribeNewsletterDTO> _validator;
        private readonly IEmailService _emailService;
        private readonly ILogger<NewsletterSubscriptionService> _logger;

        public NewsletterSubscriptionService(
            INewsletterSubscriptionRepository repository,
            IValidator<SubscribeNewsletterDTO> validator,
            IEmailService emailService,
            ILogger<NewsletterSubscriptionService> logger)
        {
            _repository = repository;
            _validator = validator;
            _emailService = emailService;
            _logger = logger;
        }

        public async Task<GenericResponse<NewsletterSubscriptionResultDTO>> SubscribeAsync(
            SubscribeNewsletterDTO model,
            CancellationToken cancellationToken = default)
        {
            model.Email = model.Email?.Trim() ?? string.Empty;
            var validation = await _validator.ValidateAsync(model, cancellationToken);
            if (!validation.IsValid)
            {
                return GenericResponse<NewsletterSubscriptionResultDTO>.BadRequest(
                    "Enter a valid email address.",
                    validation.Errors.Select(error => error.ErrorMessage));
            }

            var email = model.Email;
            var normalizedEmail = email.ToLowerInvariant();
            if (await _repository.ExistsAsync(normalizedEmail, cancellationToken))
            {
                return AlreadySubscribed();
            }

            var subscribedAtUtc = DateTime.UtcNow;
            var subscription = new NewsletterSubscription
            {
                Email = email,
                NormalizedEmail = normalizedEmail,
                SubscribedAtUtc = subscribedAtUtc,
                IsActive = true,
                WelcomeEmailLastAttemptAtUtc = subscribedAtUtc,
                WelcomeEmailAttemptCount = 1
            };

            if (!await _repository.TryAddAsync(subscription, cancellationToken))
            {
                return AlreadySubscribed();
            }

            var welcomeEmailSent = false;
            try
            {
                await _emailService.SendNewsletterWelcomeEmailAsync(email, cancellationToken);
                welcomeEmailSent = true;
                await _repository.MarkWelcomeEmailSentAsync(
                    subscription.Id,
                    DateTime.UtcNow,
                    cancellationToken);
            }
            catch (OperationCanceledException) when (cancellationToken.IsCancellationRequested)
            {
                throw;
            }
            catch (Exception exception)
            {
                _logger.LogError(
                    exception,
                    "Newsletter subscription {SubscriptionId} was stored, but the welcome email to {Recipient} failed",
                    subscription.Id,
                    email);

                try
                {
                    await _repository.MarkWelcomeEmailAttemptAsync(
                        subscription.Id,
                        DateTime.UtcNow,
                        cancellationToken);
                }
                catch (Exception trackingException)
                {
                    _logger.LogError(
                        trackingException,
                        "Failed to record the welcome email attempt for subscription {SubscriptionId}",
                        subscription.Id);
                }
            }

            return GenericResponse<NewsletterSubscriptionResultDTO>.Success(
                new NewsletterSubscriptionResultDTO
                {
                    IsNewSubscription = true,
                    WelcomeEmailSent = welcomeEmailSent
                },
                welcomeEmailSent
                    ? "You subscribed successfully. Please check your email for our welcome message."
                    : "You subscribed successfully. Your welcome email will be sent shortly.");
        }

        private static GenericResponse<NewsletterSubscriptionResultDTO> AlreadySubscribed()
            => GenericResponse<NewsletterSubscriptionResultDTO>.Success(
                new NewsletterSubscriptionResultDTO
                {
                    IsNewSubscription = false,
                    WelcomeEmailSent = false
                },
                "This email is already subscribed.");
    }
}
