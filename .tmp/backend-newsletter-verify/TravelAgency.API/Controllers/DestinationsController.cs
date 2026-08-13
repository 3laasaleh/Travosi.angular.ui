using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.Filters;
using TravelAgency.Application.DTOs.Destinations;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Models;

namespace TravelAgency.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DestinationsController : ControllerBase
    {
        private readonly IDestinationService _destinationService;

        public DestinationsController(IDestinationService destinationService)
        {
            _destinationService = destinationService;
        }

        [HttpGet]
        public async Task<GenericResponse<PaginationModel<DestinationDTO>>> get([FromQuery] int page=1, [FromQuery] int pageSize=20)
           => await _destinationService.GetAllAsync(page, pageSize, true);


        [HttpGet("GetAll")]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<PaginationModel<DestinationDTO>>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
            => await _destinationService.GetAllAsync(page, pageSize,false);

        [HttpGet("{id:int}")]
        public async Task<GenericResponse<DestinationDTO?>> GetById(int id, CancellationToken cancellationToken)
            => await _destinationService.GetByIdAsync(id, cancellationToken);

        [HttpGet("Navigation")]
        public async Task<GenericResponse<IList<DestinationNavigationDTO>>> GetNavigation(
            [FromQuery] int takeDestinations = 10,
            [FromQuery] int takeCities = 10,
            [FromQuery] int takeTours = 8)
            => await _destinationService.GetNavigationAsync(
                takeDestinations,
                takeCities,
                takeTours);

        [HttpPost]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<DestinationDTO>> Add([FromForm] CreateDestinationDTO model, CancellationToken cancellationToken)
            => await _destinationService.AddAsync(model, cancellationToken);

        [HttpPut]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<DestinationDTO>> Update([FromForm] UpdateDestinationDTO model, CancellationToken cancellationToken)
            => await _destinationService.UpdateAsync(model, cancellationToken);

        [HttpPatch("{id:int}/ChangeStatus")]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<bool>> ChangeStatus(int id, CancellationToken cancellationToken)
            => await _destinationService.ChangeStatusAsync(id, cancellationToken);

        [HttpDelete("deleteImage/{id:int}")]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<bool>> deleteImage(int id, CancellationToken cancellationToken)
            => await _destinationService.DeleteImageAsync(id, cancellationToken);
    }
}
