using FluentValidation;
using TravelAgency.Application.DTOs.Packages;

namespace TravelAgency.Application.Validators
{
    public class CreatePackageDestinationDTOValidator : AbstractValidator<CreatePackageDestinationDTO>
    {
        public CreatePackageDestinationDTOValidator()
        {
            RuleFor(x => x.DestinationId).GreaterThan(0);
            RuleFor(x => x.DisplayOrder).GreaterThanOrEqualTo(0);
        }
    }

    public class CreatePackageItineraryDTOValidator : AbstractValidator<CreatePackageItineraryDTO>
    {
        public CreatePackageItineraryDTOValidator()
        {
            RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Description).MaximumLength(2000);
            RuleFor(x => x.DayNumber).GreaterThan(0).WithMessage("Itinerary day number must start at 1.");
            RuleFor(x => x.EndTime)
                .GreaterThan(x => x.StartTime)
                .When(x => x.StartTime.HasValue && x.EndTime.HasValue)
                .WithMessage("Itinerary end time must be after start time.");
            RuleFor(x => x.Childs).NotNull();
            RuleForEach(x => x.Childs).SetValidator(this);
        }
    }

    public class CreatePackageDTOValidator : AbstractValidator<CreatePackageDTO>
    {
        public CreatePackageDTOValidator()
        {
            RuleFor(x => x.NameEng).NotEmpty().MaximumLength(200);
            RuleFor(x => x.NameAr).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Description).NotEmpty().MaximumLength(4000);
            RuleFor(x => x.DurationDays).GreaterThan(0);
            RuleFor(x => x.DurationHours).InclusiveBetween(0, 23);
            RuleFor(x => x.PricePerPerson).GreaterThan(0).WithMessage("Price per person must be greater than zero.");
            RuleFor(x => x.PricePerChild).GreaterThanOrEqualTo(0);
            RuleFor(x => x.CurrencyId).GreaterThan(0).WithMessage("A source currency is required.");
            RuleFor(x => x.MaxCapacity).GreaterThan(0);
            RuleFor(x => x.CancellationPolicy)
                .NotEmpty()
                .When(x => !x.IsFreeCancelation)
                .WithMessage("A cancellation policy is required when cancellation is not free.");
            RuleFor(x => x.DateTo)
                .GreaterThanOrEqualTo(x => x.DateFrom)
                .WithMessage("Package end date must be on or after the start date.");
            RuleFor(x => x.Destinations)
                .NotEmpty().WithMessage("A package must include at least one destination.");
            RuleForEach(x => x.Destinations).SetValidator(new CreatePackageDestinationDTOValidator());
            RuleFor(x => x)
                .Must(x => x.Destinations.Select(d => d.DestinationId).Distinct().Count() == x.Destinations.Count)
                .WithMessage("The same destination cannot be added twice to a package.");

        }
    }

    public class UpdatePackageDTOValidator : AbstractValidator<UpdatePackageDTO>
    {
        public UpdatePackageDTOValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0);
            RuleFor(x => x.NameEng).NotEmpty().MaximumLength(200);
            RuleFor(x => x.NameAr).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Description).NotEmpty().MaximumLength(4000);
            RuleFor(x => x.DurationDays).GreaterThan(0);
            RuleFor(x => x.DurationHours).InclusiveBetween(0, 23);
            RuleFor(x => x.PricePerPerson).GreaterThan(0);
            RuleFor(x => x.PricePerChild).GreaterThanOrEqualTo(0);
            RuleFor(x => x.CurrencyId).GreaterThan(0).WithMessage("A source currency is required.");
            RuleFor(x => x.MaxCapacity).GreaterThan(0);
            RuleFor(x => x.DateTo)
                .GreaterThanOrEqualTo(x => x.DateFrom)
                .WithMessage("Package end date must be on or after the start date.");
            RuleFor(x => x.Destinations)
                .NotEmpty().WithMessage("A package must include at least one destination.");
            RuleForEach(x => x.Destinations).SetValidator(new CreatePackageDestinationDTOValidator());
            RuleFor(x => x)
                .Must(x => x.Destinations.Select(d => d.DestinationId).Distinct().Count() == x.Destinations.Count)
                .WithMessage("The same destination cannot be added twice to a package.");

        }
    }

    public class AddPackageImageDTOValidator : AbstractValidator<AddPackageImageDTO>
    {
        public AddPackageImageDTOValidator()
        {
            RuleFor(x => x.PackageId).GreaterThan(0);
            RuleFor(x => x.Images).NotNull().NotEmpty();
            RuleForEach(x => x.Images)
                .Must(image => image.Length > 0)
                .WithMessage("Uploaded images cannot be empty.");
        }
    }

    public class AddPackageItineraryDTOValidator : AbstractValidator<AddPackageItineraryDTO>
    {
        public AddPackageItineraryDTOValidator()
        {
            RuleFor(x => x.PackageId).GreaterThan(0);
            RuleFor(x => x.Itinerary).NotNull().NotEmpty();
            RuleForEach(x => x.Itinerary)
                .SetValidator(new CreatePackageItineraryDTOValidator());
        }
    }

    internal static class PackageItineraryValidation
    {
        public static IEnumerable<CreatePackageItineraryDTO> Flatten(
            IEnumerable<CreatePackageItineraryDTO>? itinerary)
        {
            foreach (var item in itinerary ?? Enumerable.Empty<CreatePackageItineraryDTO>())
            {
                yield return item;

                foreach (var child in Flatten(item.Childs))
                    yield return child;
            }
        }
    }
}
