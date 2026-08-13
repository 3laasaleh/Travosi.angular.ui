namespace TravelAgency.Domain.Entities
{
    public class NewsletterSubscription
    {
        public int Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string NormalizedEmail { get; set; } = string.Empty;
        public DateTime SubscribedAtUtc { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime? WelcomeEmailSentAtUtc { get; set; }
        public DateTime? WelcomeEmailLastAttemptAtUtc { get; set; }
        public int WelcomeEmailAttemptCount { get; set; }
    }
}
