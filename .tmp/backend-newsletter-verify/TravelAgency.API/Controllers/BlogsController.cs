using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.Filters;
using TravelAgency.Application.DTOs.Blogs;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Models;

namespace TravelAgency.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogsController : ControllerBase
    {
        private readonly IBlogService _blogService;

        public BlogsController(IBlogService blogService) => _blogService = blogService;

        [HttpGet]
        public Task<GenericResponse<PaginationModel<BlogDTO>>> Get([FromQuery] int page = 1, [FromQuery] int pageSize = 12)
            => _blogService.GetAllAsync(page, pageSize, true);

        [HttpGet("GetAll")]
        [AdminOrAgentFilter]
        public Task<GenericResponse<PaginationModel<BlogDTO>>> GetAll([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
            => _blogService.GetAllAsync(page, pageSize, false);

        [HttpGet("AllActive")]
        public Task<GenericResponse<IList<BlogDTO>>> GetAllActive()
            => _blogService.GetAllActiveAsync();

        [HttpGet("{id:int}")]
        public Task<GenericResponse<BlogDTO?>> GetById(int id)
            => _blogService.GetByIdAsync(id, true);

        [HttpPost]
        [AdminOrAgentFilter]
        public Task<GenericResponse<BlogDTO>> Create([FromForm] CreateBlogDTO model, CancellationToken cancellationToken)
            => _blogService.AddAsync(model, cancellationToken);

        [HttpPut]
        [AdminOrAgentFilter]
        public Task<GenericResponse<BlogDTO>> Update([FromForm] UpdateBlogDTO model, CancellationToken cancellationToken)
            => _blogService.UpdateAsync(model, cancellationToken);

        [HttpPatch("{id:int}/ChangeStatus")]
        [AdminOrAgentFilter]
        public Task<GenericResponse<bool>> ChangeStatus(int id)
            => _blogService.ChangeStatusAsync(id);

        [HttpDelete("deleteImage/{id:int}")]
        [AdminOrAgentFilter]
        public Task<GenericResponse<bool>> DeleteImage(int id, CancellationToken cancellationToken)
            => _blogService.DeleteImageAsync(id, cancellationToken);
    }
}
