using TravelAgency.Application.DTOs.Bookings;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Domain.Enums;
using TravelAgency.Domain.Models;

namespace TravelAgency.Application.Interfaces
{
    public interface IBookingService
    {
        Task<GenericResponse<PaginationModel<BookingDTO>>> GetAllAsync(int pageNumber, int pageSize, BookingStatusEnum? status = null);
        Task<GenericResponse<PaginationModel<BookingDTO>>> GetByUserAsync(int pageNumber, int pageSize, int userId);
        Task<GenericResponse<IList<BookingDTO>>> GetListByUserAsync(int userId);
        Task<GenericResponse<PaginationModel<BookingDTO>>> GetByAgentAsync(int pageNumber, int pageSize, int agentId, BookingStatusEnum? status = null);
        Task<GenericResponse<BookingDTO?>> GetByIdAsync(int id);
        Task<GenericResponse<BookingDTO>> AddAsync(CreateBookingDTO model, int userId);
        Task<GenericResponse<BookingDTO>> UpdateAsync(UpdateBookingDTO model, int userId);
        Task<GenericResponse<bool>> ChangeStatusAsync(int id, ChangeBookingStatusByIdDTO model, int userId, bool isAdmin);
        Task<GenericResponse<bool>> AssignAgentAsync(int bookingId, int agentId, int adminId);
        Task<GenericResponse<bool>> DeleteAsync(int id);
    }
}
