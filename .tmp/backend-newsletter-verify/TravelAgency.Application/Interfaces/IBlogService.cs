using TravelAgency.Application.DTOs.Blogs;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Domain.Models;

namespace TravelAgency.Application.Interfaces
{
    public interface IBlogService
    {
        Task<GenericResponse<PaginationModel<BlogDTO>>> GetAllAsync(int page, int pageSize, bool activeOnly);
        Task<GenericResponse<IList<BlogDTO>>> GetAllActiveAsync();
        Task<GenericResponse<BlogDTO?>> GetByIdAsync(int id, bool activeOnly);
        Task<GenericResponse<BlogDTO>> AddAsync(CreateBlogDTO model, CancellationToken cancellationToken);
        Task<GenericResponse<BlogDTO>> UpdateAsync(UpdateBlogDTO model, CancellationToken cancellationToken);
        Task<GenericResponse<bool>> ChangeStatusAsync(int id);
        Task<GenericResponse<bool>> DeleteImageAsync(int imageId, CancellationToken cancellationToken);
    }
}
