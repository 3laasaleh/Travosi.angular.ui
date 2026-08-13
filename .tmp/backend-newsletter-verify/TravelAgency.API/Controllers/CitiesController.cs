using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.Filters;
using TravelAgency.Application.DTOs.Geography;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Models;

namespace TravelAgency.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly ICityService _cityService;

        public CitiesController(ICityService cityService)
        {
            _cityService = cityService;
        }

        [HttpGet]
        public async Task<GenericResponse<PaginationModel<CityDTO>>> GetAll(
            [FromQuery] int? destinationId,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
            => await _cityService.GetAllAsync(page, pageSize, destinationId, true);

        [HttpGet("GetAll")]
        [AdminOrAgentFilter]
        public async Task<GenericResponse<PaginationModel<CityDTO>>> GetAllForManagement(
            [FromQuery] int? destinationId,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20)
            => await _cityService.GetAllAsync(page, pageSize, destinationId, false);

        [HttpGet("{id:int}")]
        public async Task<GenericResponse<CityDetailsDTO?>> GetById(int id)
            => await _cityService.GetByIdAsync(id);

        [HttpPost]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<CityDTO>> Add([FromBody] CreateCityDTO model)
            => await _cityService.AddAsync(model);

        [HttpPut]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<CityDTO>> Update([FromBody] UpdateCityDTO model)
            => await _cityService.UpdateAsync(model);

        [HttpPatch("{id:int}/ChangeStatus")]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<bool>> ChangeStatus(int id)
            => await _cityService.ChangeStatusAsync(id);

        [HttpDelete("{id:int}")]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<bool>> Delete(int id)
            => await _cityService.DeleteAsync(id);
    }
}
