using TravelAgency.Application.DTOs.Hotels;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Domain.Models;

namespace TravelAgency.Application.Interfaces
{
    public interface IHotelService
    {
        Task<GenericResponse<PaginationModel<HotelDTO>>> GetAllAsync(int pageNumber, int pageSize, bool isActive = false);
        Task<GenericResponse<HotelDTO?>> GetByIdAsync(int id);
        Task<GenericResponse<HotelDTO>> AddAsync(CreateHotelDTO model);
        Task<GenericResponse<HotelDTO>> UpdateAsync(UpdateHotelDTO model);
        Task<GenericResponse<bool>> ChangeStatusAsync(int id);
        Task<GenericResponse<bool>> DeleteAsync(int id);
    }

    public interface IHotelRoomService
    {
        Task<GenericResponse<IList<HotelRoomDTO>>> GetByHotelAsync(int hotelId);
        Task<GenericResponse<HotelRoomDTO?>> GetByIdAsync(int id);
        Task<GenericResponse<HotelRoomDTO>> AddAsync(CreateHotelRoomDTO model);
        Task<GenericResponse<HotelRoomDTO>> UpdateAsync(UpdateHotelRoomDTO model);
        Task<GenericResponse<bool>> ChangeStatusAsync(int id);
        Task<GenericResponse<bool>> DeleteAsync(int id);
    }
}
