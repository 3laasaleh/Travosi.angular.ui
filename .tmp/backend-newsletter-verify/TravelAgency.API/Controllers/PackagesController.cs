using Microsoft.AspNetCore.Mvc;
using QuestPDF.Helpers;
using TravelAgency.API.Filters;
using TravelAgency.Application.DTOs.Destinations;
using TravelAgency.Application.DTOs.Packages;
using TravelAgency.Application.DTOs.Tours;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Application.Services;
using TravelAgency.Domain.Models;

namespace TravelAgency.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackagesController : ControllerBase
    {
        private readonly IPackageService _packageService;

        public PackagesController(IPackageService packageService)
        {
            _packageService = packageService;
        }


        [HttpGet("GetAll")]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<PaginationModel<PackageDTO>>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
            => await _packageService.GetAllAsync(page, pageSize);

        [HttpGet]
        public async Task<GenericResponse<PaginationModel<PackageDTO>>> get([FromQuery] int page, [FromQuery] int pageSize)
          => await _packageService.GetAllAsync(page, pageSize);
     

        [HttpGet("ByDestination/{destinationId:int}")]
        public async Task<GenericResponse<IList<PackageDTO>>> GetByDestination(int destinationId)
            => await _packageService.GetByDestinationAsync(destinationId);

        [HttpGet("{id:int}")]
        public async Task<GenericResponse<PackageDTO?>> GetById(int id)
            => await _packageService.GetByIdAsync(id);

        [HttpPost]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<PackageDTO>> Add([FromBody] CreatePackageDTO model)
            => await _packageService.AddAsync(model);

        [HttpPost("AddImages")]
        [AdminOrAgentFilter]
        public async Task<GenericResponse<PackageDTO>> AddImages(
            [FromForm] AddPackageImageDTO model)
            => await _packageService.AddImagesAsync(model);

        [HttpPost("AddItinerary")]
        [AdminOrAgentFilter]
        public async Task<GenericResponse<PackageDTO>> AddItinerary(
            [FromBody] AddPackageItineraryDTO model)
            => await _packageService.AddItineraryAsync(model);

        [HttpPut]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<PackageDTO>> Update([FromBody] UpdatePackageDTO model)
            => await _packageService.UpdateAsync(model);

        [HttpPatch("ChangeStatus")]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<bool>> ChangeStatus([FromBody] ChangeStatusDTO model)
            => await _packageService.ChangeStatusAsync(model);

        [HttpDelete("deleteImage/{id:int}")]
        [AdminOrAgentFilter]
        public async Task<GenericResponse<bool>> DeleteImage(int id)
            => await _packageService.DeleteImageAsync(id);

        [HttpDelete("{id:int}")]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<bool>> Delete(int id)
            => await _packageService.DeleteAsync(id);
    }
}
