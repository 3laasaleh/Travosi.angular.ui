using FluentValidation;
using Microsoft.AspNetCore.Http;
using TravelAgency.Application.DTOs.Blogs;

namespace TravelAgency.Application.Validators
{
    public class CreateBlogDTOValidator : AbstractValidator<CreateBlogDTO>
    {
        public CreateBlogDTOValidator()
        {
            RuleFor(x => x.TitleEng).NotEmpty().MaximumLength(200);
            RuleFor(x => x.TitleAr).NotEmpty().MaximumLength(200);
            RuleFor(x => x.SummaryEng).MaximumLength(500);
            RuleFor(x => x.SummaryAr).MaximumLength(500);
            RuleFor(x => x.ContentEng).NotEmpty().MaximumLength(15000);
            RuleFor(x => x.ContentAr).NotEmpty().MaximumLength(15000);
            RuleFor(x => x.PublishedAt)
                .LessThanOrEqualTo(DateTime.UtcNow.AddYears(1))
                .When(x => x.PublishedAt.HasValue);
            RuleFor(x => x.Images).Must(images => images.Count <= 5)
                .WithMessage("A blog can contain at most 5 images.");
            RuleForEach(x => x.Images).SetValidator(new BlogImageFileValidator());
        }
    }

    public class UpdateBlogDTOValidator : AbstractValidator<UpdateBlogDTO>
    {
        public UpdateBlogDTOValidator()
        {
            Include(new CreateBlogDTOValidator());
            RuleFor(x => x.Id).GreaterThan(0);
        }
    }

    internal class BlogImageFileValidator : AbstractValidator<IFormFile>
    {
        private static readonly string[] AllowedTypes = ["image/jpeg", "image/png", "image/webp"];

        public BlogImageFileValidator()
        {
            RuleFor(x => x).NotNull();
            RuleFor(x => x.Length).GreaterThan(0).LessThanOrEqualTo(5 * 1024 * 1024);
            RuleFor(x => x.ContentType).Must(type => AllowedTypes.Contains(type, StringComparer.OrdinalIgnoreCase))
                .WithMessage("Blog images must be JPEG, PNG, or WebP.");
        }
    }
}
