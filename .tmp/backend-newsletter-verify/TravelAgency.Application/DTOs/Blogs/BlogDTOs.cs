using Microsoft.AspNetCore.Http;
using TravelAgency.Application.DTOs;

namespace TravelAgency.Application.DTOs.Blogs
{
    public class BlogDTO
    {
        public int Id { get; set; }
        public string TitleEng { get; set; } = string.Empty;
        public string TitleAr { get; set; } = string.Empty;
        public string? SummaryEng { get; set; }
        public string? SummaryAr { get; set; }
        public string ContentEng { get; set; } = string.Empty;
        public string ContentAr { get; set; } = string.Empty;
        public DateTime PublishedAt { get; set; }
        public bool IsActive { get; set; }
        public List<ImageDTO> Images { get; set; } = new();
    }

    public class CreateBlogDTO
    {
        public string TitleEng { get; set; } = string.Empty;
        public string TitleAr { get; set; } = string.Empty;
        public string? SummaryEng { get; set; }
        public string? SummaryAr { get; set; }
        public string ContentEng { get; set; } = string.Empty;
        public string ContentAr { get; set; } = string.Empty;
        public DateTime? PublishedAt { get; set; }
        public List<IFormFile> Images { get; set; } = new();
    }

    public class UpdateBlogDTO : CreateBlogDTO
    {
        public int Id { get; set; }
    }
}
