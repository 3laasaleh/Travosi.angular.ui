using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.Filters;
using TravelAgency.Application.DTOs.Crm;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;

namespace TravelAgency.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [AdminOrAgentFilter]
    public class TravelersController : ControllerBase
    {
        private readonly ITravelerService _travelerService;

        public TravelersController(ITravelerService travelerService)
        {
            _travelerService = travelerService;
        }

        [HttpGet("ByCustomer/{customerId:int}")]
        public async Task<GenericResponse<IList<TravelerDTO>>> GetByCustomer(int customerId)
            => await _travelerService.GetByCustomerAsync(customerId);

        [HttpGet("{id:int}")]
        public async Task<GenericResponse<TravelerDTO?>> GetById(int id)
            => await _travelerService.GetByIdAsync(id);

        [HttpPost]
        public async Task<GenericResponse<TravelerDTO>> Add([FromBody] CreateTravelerDTO model)
            => await _travelerService.AddAsync(model);

        [HttpPut]
        public async Task<GenericResponse<TravelerDTO>> Update([FromBody] UpdateTravelerDTO model)
            => await _travelerService.UpdateAsync(model);

        [HttpDelete("{id:int}")]
        public async Task<GenericResponse<bool>> Delete(int id)
            => await _travelerService.DeleteAsync(id);
    }
}
