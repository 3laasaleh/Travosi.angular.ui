using TravelAgency.Application.DTOs.Destinations;
using TravelAgency.Application.DTOs.Tours;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Domain.Models;

namespace TravelAgency.Application.Interfaces
{
    public interface ITourService
    {

        Task<GenericResponse<PaginationModel<TourHomeDTO>>> GetHomePageAsync();
        Task<GenericResponse<PaginationModel<TourDTO>>> GetAllAsync(
            int pageNumber,
            int pageSize,
            bool isAvtive = false,
            int? destinationId = null,
            int? cityId = null);
        Task<GenericResponse<IList<TourDTO>>> GetByDestinationAsync(int destinationId);
        Task<GenericResponse<TourDTO?>> GetByIdAsync(int id);
        Task<GenericResponse<TourDTO>> AddAsync(CreateTourDTO model);
        Task<GenericResponse<TourDTO>> AddImagesAsync(AddTourImageDTO model, CancellationToken cancellationToken);
        Task<GenericResponse<TourDTO>> SetCoverImageAsync(SetTourCoverImageDTO model);
        Task<GenericResponse<TourDTO>> AddItineraryAsync(AddTourItenraryDTO model);
        Task<GenericResponse<TourDTO>> UpdateAsync(UpdateTourDTO model);
        Task<GenericResponse<bool>> ChangeStatusAsync(ChangeStatusDTO model);
        Task<GenericResponse<bool>> DeleteAsync(int id);
        Task<GenericResponse<bool>> DeleteImageAsync(int ImageId, CancellationToken cancellationToken);
    }
}
