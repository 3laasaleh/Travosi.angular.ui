using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.Filters;
using TravelAgency.Application.DTOs.Bookings;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Enums;
using TravelAgency.Domain.Models;

namespace TravelAgency.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BookingsController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingsController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        /// <summary>
        /// Role-aware booking listing: admins see every booking, agents only bookings assigned to them.
        /// </summary>
        [HttpGet]
        [AdminOrAgentFilter]
        public async Task<GenericResponse<PaginationModel<BookingDTO>>> Get([FromQuery] int page, [FromQuery] int pageSize, [FromQuery] BookingStatusEnum? status = null)
        {
            var isAdmin = User.IsInRole(UserRoleEnum.Admin.ToString());
            return isAdmin
                ? await _bookingService.GetAllAsync(page, pageSize, status)
                : await _bookingService.GetByAgentAsync(page, pageSize, User.GetUserId(), status);
        }

        /// <summary>
        /// Bookings of the logged in customer.
        /// </summary>
        [HttpGet("UserBooking")]
        public async Task<GenericResponse<PaginationModel<BookingDTO>>> UserBooking([FromQuery] int page, [FromQuery] int pageSize)
            => await _bookingService.GetByUserAsync(page, pageSize,User.GetUserId());

        /// <summary>
        /// Bookings of a given user. Customers can only read their own list, agents and admins can read any.
        /// </summary>
        [HttpGet("user/{userId:int}")]
        public async Task<IActionResult> GetUserBookings(int userId)
        {
            var isStaff = User.IsInRole(UserRoleEnum.Admin.ToString()) || User.IsInRole(UserRoleEnum.Agent.ToString());
            if (!isStaff && User.GetUserId() != userId)
                return Forbid();

            var result = await _bookingService.GetListByUserAsync(userId);
            return Ok(result.Data);
        }

        [HttpGet("{id:int}")]
        public async Task<GenericResponse<BookingDTO?>> GetById(int id)
            => await _bookingService.GetByIdAsync(id);

        /// <summary>
        /// Customer books a tour or a package, booking is saved with Pending status.
        /// </summary>
        [HttpPost]
        public async Task<GenericResponse<BookingDTO>> Add([FromBody] CreateBookingDTO model)
            => await _bookingService.AddAsync(model, User.GetUserId());

        [HttpPut]
        [AdminOrAgentFilter]
        public async Task<GenericResponse<BookingDTO>> Edit([FromBody] UpdateBookingDTO model)
            => await _bookingService.UpdateAsync(model, User.GetUserId());

        /// <summary>
        /// Admin confirms or cancels a pending booking.
        /// </summary>
        [HttpPatch("ChangeStatus")]
        [AdminOrAgentFilter]
        public async Task<GenericResponse<bool>> ChangeStatus([FromBody] ChangeBookingStatusDTO model)
        {
            var isAdmin = User.IsInRole(UserRoleEnum.Admin.ToString());
            return await _bookingService.ChangeStatusAsync(model.Id, new ChangeBookingStatusByIdDTO
            {
                Status = model.Status,
                CancellationFeeAmount = model.CancellationFeeAmount,
                Note = model.Note,
                CustomerContacted = model.CustomerContacted
            }, User.GetUserId(), isAdmin);
        }

        /// <summary>
        /// Role-aware status change: admins can update any booking, agents only bookings assigned to them.
        /// </summary>
        [HttpPatch("{id:int}/ChangeStatus")]
        [AdminOrAgentFilter]
        public async Task<GenericResponse<bool>> ChangeStatusById(int id, [FromBody] ChangeBookingStatusByIdDTO model)
        {
            var isAdmin = User.IsInRole(UserRoleEnum.Admin.ToString());
            return await _bookingService.ChangeStatusAsync(id, model, User.GetUserId(), isAdmin);
        }

        /// <summary>
        /// Admin assigns a booking (and its customer) to an agent. The agent gets notified.
        /// </summary>
        [HttpPatch("{id:int}/AssignAgent")]
        [AdminOnlyFilter]
        public async Task<GenericResponse<bool>> AssignAgent(int id, [FromBody] AssignAgentDTO model)
            => await _bookingService.AssignAgentAsync(id, model.AgentId, User.GetUserId());

        [HttpDelete("{id:int}")]
        [AdminOnlyFilter]
        public async Task<GenericResponse<bool>> Delete(int id)
            => await _bookingService.DeleteAsync(id);
    }
}
