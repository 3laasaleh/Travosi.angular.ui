using TravelAgency.Application.DTOs.Newsletter;
using TravelAgency.Application.DTOs.User;

namespace TravelAgency.Application.Interfaces
{
    public interface INewsletterSubscriptionService
    {
        Task<GenericResponse<NewsletterSubscriptionResultDTO>> SubscribeAsync(
            SubscribeNewsletterDTO model,
            CancellationToken cancellationToken = default);
    }
}
