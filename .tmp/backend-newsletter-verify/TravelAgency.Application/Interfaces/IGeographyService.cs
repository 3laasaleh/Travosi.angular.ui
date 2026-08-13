using TravelAgency.Application.DTOs.Geography;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Domain.Models;

namespace TravelAgency.Application.Interfaces
{
    public interface ICityService
    {
        Task<GenericResponse<PaginationModel<CityDTO>>> GetAllAsync(
            int pageNumber,
            int pageSize,
            int? destinationId = null,
            bool isActiveOnly = false);
        Task<GenericResponse<CityDetailsDTO?>> GetByIdAsync(int id);
        Task<GenericResponse<CityDTO>> AddAsync(CreateCityDTO model);
        Task<GenericResponse<CityDTO>> UpdateAsync(UpdateCityDTO model);
        Task<GenericResponse<bool>> ChangeStatusAsync(int id);
        Task<GenericResponse<bool>> DeleteAsync(int id);
    }
}
