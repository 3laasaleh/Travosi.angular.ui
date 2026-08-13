using TravelAgency.Application.DTOs.Destinations;
using TravelAgency.Application.DTOs.Packages;
using TravelAgency.Application.DTOs.Tours;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Domain.Models;

namespace TravelAgency.Application.Interfaces
{
    public interface IPackageService
    {

        Task<GenericResponse<PaginationModel<PackageDTO>>> GetAllAsync(int pageNumber, int pageSize);
        Task<GenericResponse<PaginationModel<PackageDTO>>> GetAllActiveAsync(int pageNumber, int pageSize);
        Task<GenericResponse<IList<PackageDTO>>> GetByDestinationAsync(int destinationId);
        Task<GenericResponse<PackageDTO?>> GetByIdAsync(int id);
        Task<GenericResponse<PackageDTO>> AddAsync(CreatePackageDTO model);
        Task<GenericResponse<PackageDTO>> UpdateAsync(UpdatePackageDTO model);
        Task<GenericResponse<PackageDTO>> AddImagesAsync(AddPackageImageDTO model);
        Task<GenericResponse<PackageDTO>> AddItineraryAsync(AddPackageItineraryDTO model);
        Task<GenericResponse<bool>> DeleteImageAsync(int imageId);
        Task<GenericResponse<bool>> ChangeStatusAsync(ChangeStatusDTO model);
        Task<GenericResponse<bool>> DeleteAsync(int id);
    }
}
