using TravelAgency.Application.DTOs.Destinations;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Domain.Models;

namespace TravelAgency.Application.Interfaces
{
    public interface IDestinationService
    {
        Task<GenericResponse<PaginationModel<DestinationDTO>>> GetAllAsync(int page, int pageSize, bool isActiveOnly);
        Task<GenericResponse<DestinationDTO?>> GetByIdAsync(int id, CancellationToken cancellationToken);
        Task<GenericResponse<IList<DestinationNavigationDTO>>> GetNavigationAsync(
            int takeDestinations,
            int takeCities,
            int takeTours);
        Task<GenericResponse<DestinationDTO>> AddAsync(CreateDestinationDTO model, CancellationToken cancellationToken);
        Task<GenericResponse<DestinationDTO>> UpdateAsync(UpdateDestinationDTO model, CancellationToken cancellationToken);
        Task<GenericResponse<bool>> ChangeStatusAsync(int id, CancellationToken cancellationToken);
        Task<GenericResponse<bool>> DeleteImageAsync(int imageId, CancellationToken cancellationToken);
    }
}
