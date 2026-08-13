using AutoMapper;
using FluentValidation;
using Microsoft.Extensions.Logging;
using TravelAgency.Application.DTOs.Blogs;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Models;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.Application.Services
{
    public class BlogService : IBlogService
    {
        private const int MaxImagesPerBlog = 5;
        private readonly IGenericRepository<Blog> _blogRepository;
        private readonly IGenericRepository<BlogImage> _imageRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IValidator<CreateBlogDTO> _createValidator;
        private readonly IValidator<UpdateBlogDTO> _updateValidator;
        private readonly ILogger<BlogService> _logger;

        public BlogService(
            IGenericRepository<Blog> blogRepository,
            IGenericRepository<BlogImage> imageRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IValidator<CreateBlogDTO> createValidator,
            IValidator<UpdateBlogDTO> updateValidator,
            ILogger<BlogService> logger)
        {
            _blogRepository = blogRepository;
            _imageRepository = imageRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _createValidator = createValidator;
            _updateValidator = updateValidator;
            _logger = logger;
        }

        public async Task<GenericResponse<PaginationModel<BlogDTO>>> GetAllAsync(int page, int pageSize, bool activeOnly)
        {
            page = Math.Max(1, page);
            pageSize = Math.Clamp(pageSize, 1, 100);
            var result = await _blogRepository.GetPaggingByIncludeAsync(
                page, pageSize, activeOnly ? blog => blog.IsActive : null, blog => blog.Images);

            var ordered = result.Data.OrderByDescending(blog => blog.PublishedAt).ToList();
            return GenericResponse<PaginationModel<BlogDTO>>.Success(new PaginationModel<BlogDTO>
            {
                Data = _mapper.Map<List<BlogDTO>>(ordered),
                Page = result.Page,
                PageSize = result.PageSize,
                TotalCount = result.TotalCount,
            });
        }

        public async Task<GenericResponse<IList<BlogDTO>>> GetAllActiveAsync()
        {
            var blogs = await _blogRepository.GetAllByAsync(blog => blog.IsActive, blog => blog.Images);
            var ordered = blogs.OrderByDescending(blog => blog.PublishedAt).ToList();
            return GenericResponse<IList<BlogDTO>>.Success(_mapper.Map<List<BlogDTO>>(ordered));
        }

        public async Task<GenericResponse<BlogDTO?>> GetByIdAsync(int id, bool activeOnly)
        {
            if (id <= 0)
                return GenericResponse<BlogDTO?>.BadRequest("A valid blog id is required.");

            var blog = await _blogRepository.GetByAsync(
                item => item.Id == id && (!activeOnly || item.IsActive), item => item.Images);
            return blog == null
                ? GenericResponse<BlogDTO?>.NotFound($"Blog with id {id} was not found.")
                : GenericResponse<BlogDTO?>.Success(_mapper.Map<BlogDTO>(blog));
        }

        public async Task<GenericResponse<BlogDTO>> AddAsync(CreateBlogDTO model, CancellationToken cancellationToken)
        {
            var validation = await _createValidator.ValidateAsync(model, cancellationToken);
            if (!validation.IsValid)
                return GenericResponse<BlogDTO>.BadRequest("Invalid blog data.", validation.Errors.Select(error => error.ErrorMessage));

            if (await HasDuplicateTitleAsync(model.TitleEng, null))
                return GenericResponse<BlogDTO>.BadRequest("A blog with this English title already exists.");

            var blog = _mapper.Map<Blog>(model);
            blog.PublishedAt = NormalizePublishedAt(model.PublishedAt);
            await _blogRepository.AddAsync(blog);
            if (!await _unitOfWork.CommitAsync())
                return GenericResponse<BlogDTO>.Failure("Failed to create blog.");

            await AddImagesAsync(blog, model.Images, cancellationToken);
            _logger.LogInformation("Blog {BlogId} created", blog.Id);
            return GenericResponse<BlogDTO>.Success(_mapper.Map<BlogDTO>(blog), "Blog created successfully.");
        }

        public async Task<GenericResponse<BlogDTO>> UpdateAsync(UpdateBlogDTO model, CancellationToken cancellationToken)
        {
            var validation = await _updateValidator.ValidateAsync(model, cancellationToken);
            if (!validation.IsValid)
                return GenericResponse<BlogDTO>.BadRequest("Invalid blog data.", validation.Errors.Select(error => error.ErrorMessage));

            var blog = await _blogRepository.GetByAsync(item => item.Id == model.Id, item => item.Images);
            if (blog == null)
                return GenericResponse<BlogDTO>.NotFound($"Blog with id {model.Id} was not found.");
            if (await HasDuplicateTitleAsync(model.TitleEng, model.Id))
                return GenericResponse<BlogDTO>.BadRequest("A blog with this English title already exists.");
            if (blog.Images.Count + model.Images.Count > MaxImagesPerBlog)
                return GenericResponse<BlogDTO>.BadRequest($"A blog can contain at most {MaxImagesPerBlog} images.");

            _mapper.Map(model, blog);
            blog.PublishedAt = NormalizePublishedAt(model.PublishedAt);
            await _blogRepository.UpdateAsync(blog);
            if (!await _unitOfWork.CommitAsync())
                return GenericResponse<BlogDTO>.Failure("Failed to update blog.");

            await AddImagesAsync(blog, model.Images, cancellationToken);
            return GenericResponse<BlogDTO>.Success(_mapper.Map<BlogDTO>(blog), "Blog updated successfully.");
        }

        public async Task<GenericResponse<bool>> ChangeStatusAsync(int id)
        {
            var blog = await _blogRepository.GetByIdAsync(id);
            if (blog == null)
                return GenericResponse<bool>.NotFound($"Blog with id {id} was not found.");

            blog.IsActive = !blog.IsActive;
            await _blogRepository.UpdateAsync(blog);
            return await _unitOfWork.CommitAsync()
                ? GenericResponse<bool>.Success(true, $"Blog status changed to {(blog.IsActive ? "active" : "inactive")}.")
                : GenericResponse<bool>.Failure("Failed to change blog status.");
        }

        public async Task<GenericResponse<bool>> DeleteImageAsync(int imageId, CancellationToken cancellationToken)
        {
            var image = await _imageRepository.GetByIdAsync(imageId);
            if (image == null)
                return GenericResponse<bool>.NotFound($"Blog image with id {imageId} was not found.");

            await _imageRepository.DeleteAsync(image);
            if (!await _unitOfWork.CommitAsync())
                return GenericResponse<bool>.Failure("Failed to delete blog image.");

            var storedName = Path.GetFileName(image.ImageUrl);
            if (!string.IsNullOrWhiteSpace(storedName))
                await Helper.DeleteImageAsync($"blogs/{image.BlogId}", storedName, cancellationToken);
            return GenericResponse<bool>.Success(true, "Blog image deleted successfully.");
        }

        private async Task<bool> HasDuplicateTitleAsync(string title, int? excludeId)
            => await _blogRepository.GetByAsync(blog =>
                blog.TitleEng.ToLower() == title.Trim().ToLower() && (!excludeId.HasValue || blog.Id != excludeId)) != null;

        private async Task AddImagesAsync(Blog blog, List<Microsoft.AspNetCore.Http.IFormFile> images, CancellationToken cancellationToken)
        {
            if (images.Count == 0)
                return;

            var records = new List<BlogImage>();
            foreach (var image in images)
            {
                var extension = Path.GetExtension(Path.GetFileName(image.FileName)).ToLowerInvariant();
                var storedName = $"{Guid.NewGuid():N}{extension}";
                var folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "blogs", blog.Id.ToString());
                Directory.CreateDirectory(folder);
                var path = Path.Combine(folder, storedName);
                await using var stream = new FileStream(path, FileMode.CreateNew, FileAccess.Write, FileShare.None);
                await image.CopyToAsync(stream, cancellationToken);
                records.Add(new BlogImage
                {
                    BlogId = blog.Id,
                    ImageName = Path.GetFileName(image.FileName),
                    ImageSize = image.Length.ToString(),
                    ImageUrl = $"blogs/{blog.Id}/{storedName}",
                });
            }

            await _imageRepository.AddListAsync(records);
            if (!await _unitOfWork.CommitAsync())
                throw new InvalidOperationException("Blog images were saved but their metadata could not be committed.");
            foreach (var image in records)
                blog.Images.Add(image);
        }

        private static DateTime NormalizePublishedAt(DateTime? publishedAt)
            => publishedAt?.Kind switch
            {
                DateTimeKind.Utc => publishedAt.Value,
                DateTimeKind.Local => publishedAt.Value.ToUniversalTime(),
                _ => DateTime.SpecifyKind(publishedAt ?? DateTime.UtcNow, DateTimeKind.Utc),
            };
    }
}
