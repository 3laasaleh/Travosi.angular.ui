using TravelAgency.Application.DTOs.Transport;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Domain.Models;

namespace TravelAgency.Application.Interfaces
{
    public interface IAirportSearchService
    {
        Task<GenericResponse<IList<AirportSearchDTO>>> SearchAsync(
            string query,
            string languageCode,
            string? sessionToken,
            CancellationToken cancellationToken = default);
    }

    public interface IAirlineService
    {
        Task<GenericResponse<PaginationModel<AirlineDTO>>> GetAllAsync(int pageNumber, int pageSize, bool isActive = false);
        Task<GenericResponse<AirlineDTO?>> GetByIdAsync(int id);
        Task<GenericResponse<AirlineDTO>> AddAsync(CreateAirlineDTO model);
        Task<GenericResponse<AirlineDTO>> UpdateAsync(UpdateAirlineDTO model);
        Task<GenericResponse<bool>> ChangeStatusAsync(int id);
        Task<GenericResponse<bool>> DeleteLogoAsync(int id);
        Task<GenericResponse<bool>> DeleteAsync(int id);
    }

    public interface IFlightService
    {
        Task<GenericResponse<PaginationModel<FlightDTO>>> GetAllAsync(int pageNumber, int pageSize);
        Task<GenericResponse<FlightDTO?>> GetByIdAsync(int id);
        Task<GenericResponse<FlightDTO>> AddAsync(CreateFlightDTO model);
        Task<GenericResponse<FlightDTO>> UpdateAsync(UpdateFlightDTO model);
        Task<GenericResponse<bool>> ChangeStatusAsync(int id);
        Task<GenericResponse<bool>> DeleteAsync(int id);
    }
}
