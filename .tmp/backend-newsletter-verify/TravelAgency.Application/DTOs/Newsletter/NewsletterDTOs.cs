namespace TravelAgency.Application.DTOs.Newsletter
{
    public class SubscribeNewsletterDTO
    {
        public string Email { get; set; } = string.Empty;
    }

    public class NewsletterSubscriptionResultDTO
    {
        public bool IsNewSubscription { get; set; }
        public bool WelcomeEmailSent { get; set; }
    }
}
