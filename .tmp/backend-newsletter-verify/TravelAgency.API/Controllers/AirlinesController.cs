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
    public class AirlinesController : ControllerBase
    {
        private readonly IAirlineService _airlineService;

        public AirlinesController(IAirlineService airlineService)
        {
            _airlineService = airlineService;
        }

        [HttpGet("GetAll")]
        public async Task<GenericResponse<PaginationModel<AirlineDTO>>> GetAll(
            [FromQuery] int page,
            [FromQuery] int pageSize)
            => await _airlineService.GetAllAsync(page, pageSize);

        [HttpGet]
        [AdminOrAgentFilter]
        public async Task<GenericResponse<PaginationModel<AirlineDTO>>> Get(
            [FromQuery] int page,
            [FromQuery] int pageSize)
            => await _airlineService.GetAllAsync(page, pageSize, true);

        [HttpGet("{id:int}")]
        public async Task<GenericResponse<AirlineDTO?>> GetById(int id)
            => await _airlineService.GetByIdAsync(id);

        [HttpPost]
        [AdminOrAgentFilter]
        public async Task<GenericResponse<AirlineDTO>> Add([FromForm] CreateAirlineDTO model)
            => await _airlineService.AddAsync(model);

        [HttpPut]
        [AdminOrAgentFilter]
        public async Task<GenericResponse<AirlineDTO>> Update([FromForm] UpdateAirlineDTO model)
            => await _airlineService.UpdateAsync(model);

        [HttpPatch("{id:int}/ChangeStatus")]
        [AdminOrAgentFilter]
        public async Task<GenericResponse<bool>> ChangeStatus(int id)
            => await _airlineService.ChangeStatusAsync(id);

        [HttpDelete("{id:int}")]
        [AdminOrAgentFilter]
        public async Task<GenericResponse<bool>> Delete(int id)
            => await _airlineService.DeleteAsync(id);

        [HttpDelete("{id:int}/logo")]
        [AdminOrAgentFilter]
        public async Task<GenericResponse<bool>> DeleteLogo(int id)
            => await _airlineService.DeleteLogoAsync(id);
    }
}
