using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.Filters;
using TravelAgency.Application.DTOs.Transport;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Models;

namespace TravelAgency.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly IFlightService _flightService;

        public FlightsController(IFlightService flightService)
        {
            _flightService = flightService;
        }

        [HttpGet("GetAll")]
        public async Task<GenericResponse<PaginationModel<FlightDTO>>> GetAll(
            [FromQuery] int page,
            [FromQuery] int pageSize)
            => await _flightService.GetAllAsync(page, pageSize);

        [HttpGet("{id:int}")]
        public async Task<GenericResponse<FlightDTO?>> GetById(int id)
            => await _flightService.GetByIdAsync(id);

        [HttpPost]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<FlightDTO>> Add([FromBody] CreateFlightDTO model)
            => await _flightService.AddAsync(model);

        [HttpPut]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<FlightDTO>> Update([FromBody] UpdateFlightDTO model)
            => await _flightService.UpdateAsync(model);

        [HttpPatch("{id:int}/ChangeStatus")]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<bool>> ChangeStatus(int id)
            => await _flightService.ChangeStatusAsync(id);

        [HttpDelete("{id:int}")]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<bool>> Delete(int id)
            => await _flightService.DeleteAsync(id);
    }
}
