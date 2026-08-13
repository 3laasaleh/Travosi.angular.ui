using TravelAgency.Application.DTOs.AboutUs;
using TravelAgency.Application.DTOs.User;

namespace TravelAgency.Application.Interfaces
{
    public interface IAboutUsService
    {
        Task<GenericResponse<AboutUsStatisticsDTO>> GetStatisticsAsync();
        Task<GenericResponse<int>> RegisterVisitorAsync(Guid visitorId);
    }
}
