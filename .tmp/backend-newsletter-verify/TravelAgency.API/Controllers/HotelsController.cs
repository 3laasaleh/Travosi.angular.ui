using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.Filters;
using TravelAgency.Application.DTOs.Hotels;
using TravelAgency.Application.DTOs.Tours;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Application.Services;
using TravelAgency.Domain.Models;

namespace TravelAgency.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelsController : ControllerBase
    {
        private readonly IHotelService _hotelService;

        public HotelsController(IHotelService hotelService)
        {
            _hotelService = hotelService;
        }

  
        [HttpGet("GetAll")]
        public async Task<GenericResponse<PaginationModel<HotelDTO>>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
          => await _hotelService.GetAllAsync(page, pageSize);

        [HttpGet]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<PaginationModel<HotelDTO>>> Get([FromQuery] int page, [FromQuery] int pageSize)
            => await _hotelService.GetAllAsync(page, pageSize,true);

        [HttpGet("{id:int}")]
        public async Task<GenericResponse<HotelDTO?>> GetById(int id)
            => await _hotelService.GetByIdAsync(id);

        [HttpPost]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<HotelDTO>> Add([FromBody] CreateHotelDTO model)
            => await _hotelService.AddAsync(model);

        [HttpPut]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<HotelDTO>> Update([FromBody] UpdateHotelDTO model)
            => await _hotelService.UpdateAsync(model);

        [HttpPatch("{id:int}/ChangeStatus")]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<bool>> ChangeStatus(int id)
            => await _hotelService.ChangeStatusAsync(id);

        [HttpDelete("{id:int}")]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<bool>> Delete(int id)
            => await _hotelService.DeleteAsync(id);
    }

    [Route("api/[controller]")]
    [ApiController]
    public class HotelRoomsController : ControllerBase
    {
        private readonly IHotelRoomService _roomService;

        public HotelRoomsController(IHotelRoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpGet("ByHotel/{hotelId:int}")]
        public async Task<GenericResponse<IList<HotelRoomDTO>>> GetByHotel(int hotelId)
            => await _roomService.GetByHotelAsync(hotelId);

        [HttpGet("{id:int}")]
        public async Task<GenericResponse<HotelRoomDTO?>> GetById(int id)
            => await _roomService.GetByIdAsync(id);

        [HttpPost]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<HotelRoomDTO>> Add([FromBody] CreateHotelRoomDTO model)
            => await _roomService.AddAsync(model);

        [HttpPut]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<HotelRoomDTO>> Update([FromBody] UpdateHotelRoomDTO model)
            => await _roomService.UpdateAsync(model);

        [HttpPatch("{id:int}/ChangeStatus")]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<bool>> ChangeStatus(int id)
            => await _roomService.ChangeStatusAsync(id);

        [HttpDelete("{id:int}")]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<bool>> Delete(int id)
            => await _roomService.DeleteAsync(id);
    }
}
