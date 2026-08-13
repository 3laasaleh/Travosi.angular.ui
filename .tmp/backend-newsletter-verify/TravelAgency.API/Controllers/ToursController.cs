using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.Filters;
using TravelAgency.Application.DTOs.Destinations;
using TravelAgency.Application.DTOs.Tours;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Application.Services;
using TravelAgency.Domain.Models;

namespace TravelAgency.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToursController : ControllerBase
    {
        private readonly ITourService _tourService;

        public ToursController(ITourService tourService)
        {
            _tourService = tourService;
        }



        
          [HttpGet("GetHomePage")]
        public async Task<GenericResponse<PaginationModel<TourHomeDTO>>> GetHomePage()
                => await _tourService.GetHomePageAsync();

        [HttpGet]
        public async Task<GenericResponse<PaginationModel<TourDTO>>> Get(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20,
            [FromQuery] int? destinationId = null,
            [FromQuery] int? cityId = null)
                => await _tourService.GetAllAsync(page, pageSize, true, destinationId, cityId);


        [HttpGet("GetAll")]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<PaginationModel<TourDTO>>> GetAll(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20,
            [FromQuery] int? destinationId = null,
            [FromQuery] int? cityId = null)
            => await _tourService.GetAllAsync(page, pageSize, false, destinationId, cityId);


        [HttpGet("ByDestination/{destinationId:int}")]
        public async Task<GenericResponse<IList<TourDTO>>> GetByDestination(int destinationId)
            => await _tourService.GetByDestinationAsync(destinationId);

        [HttpGet("{id:int}")]
        public async Task<GenericResponse<TourDTO?>> GetById(int id)
            => await _tourService.GetByIdAsync(id);

        [HttpPost]
        [AdminOrAgentFilter]
        public async Task<GenericResponse<TourDTO>> Add([FromBody] CreateTourDTO model)
            => await _tourService.AddAsync(model);

        [HttpPost("AddImages")]
        [AdminOrAgentFilter]
        public async Task<GenericResponse<TourDTO>> AddImages(
            [FromForm] AddTourImageDTO model,
            CancellationToken cancellationToken)
            => await _tourService.AddImagesAsync(model, cancellationToken);

        [HttpPatch("CoverImage")]
        [AdminOrAgentFilter]
        public async Task<GenericResponse<TourDTO>> SetCoverImage([FromBody] SetTourCoverImageDTO model)
            => await _tourService.SetCoverImageAsync(model);

        [HttpPost("AddItinerary")]
        [AdminOrAgentFilter]
        public async Task<GenericResponse<TourDTO>> AddItinerary([FromBody] AddTourItenraryDTO model)
            => await _tourService.AddItineraryAsync(model);

        [HttpPut]
        [AdminOrAgentFilter]
        public async Task<GenericResponse<TourDTO>> Edit([FromBody] UpdateTourDTO model)
            => await _tourService.UpdateAsync(model);

        [HttpPatch("ChangeStatus")]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<bool>> ChangeStatus([FromBody] ChangeStatusDTO model)
            => await _tourService.ChangeStatusAsync(model);

        [HttpDelete("{id:int}")]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<bool>> Delete(int id)
            => await _tourService.DeleteAsync(id);

        [HttpDelete("deleteImage/{id:int}")]
        [AdminOrAgentFilter]
        public async Task<GenericResponse<bool>> deleteImage(int id, CancellationToken cancellationToken)
    => await _tourService.DeleteImageAsync(id, cancellationToken);
    }
}
