using FluentValidation;
using TravelAgency.Application.DTOs.Tours;

namespace TravelAgency.Application.Validators
{
    public class CreateTourItineraryDTOValidator : AbstractValidator<CreateTourItineraryDTO>
    {
        public CreateTourItineraryDTOValidator()
        {
            RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Description).MaximumLength(2000);
            RuleFor(x => x.DayNumber).GreaterThan(0)
                .WithMessage("Itinerary day number must start at 1.");
            RuleFor(x => x.EndTime)
                .GreaterThan(x => x.StartTime)
                .When(x => x.StartTime.HasValue && x.EndTime.HasValue)
                .WithMessage("Itinerary end time must be after start time.");
            RuleFor(x => x.Childs).NotNull();
            RuleForEach(x => x.Childs).SetValidator(this);
        }
    }

    public class CreateTourDTOValidator : AbstractValidator<CreateTourDTO>
    {
        public CreateTourDTOValidator()
        {
            RuleFor(x => x.TitleEng).NotEmpty().MaximumLength(200);
            RuleFor(x => x.TitleAr).NotEmpty().MaximumLength(200);
            RuleFor(x => x.DestinationId).GreaterThan(0).WithMessage("Destination is required.");
            RuleFor(x => x.CityId)
                .NotNull().GreaterThan(0)
                .WithMessage("City is required.");
            //RuleFor(x => x.CurrencyId).GreaterThan(0).WithMessage("Currency is required.");
            RuleFor(x => x.PricePerPerson).GreaterThan(0);
            RuleFor(x => x.PricePerChild).GreaterThanOrEqualTo(0);
            RuleFor(x => x.MaxSeats).GreaterThan(0);
            RuleFor(x => x.DurationDays).GreaterThanOrEqualTo(0);
            RuleFor(x => x.Durationhours).InclusiveBetween(0, 23);
            RuleFor(x => x.StartDate).NotEmpty();
            RuleFor(x => x.EndDate)
                .GreaterThanOrEqualTo(x => x.StartDate)
                .WithMessage("End date must be after start date.");
        }
    }

    public class UpdateTourDTOValidator : AbstractValidator<UpdateTourDTO>
    {
        public UpdateTourDTOValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0).WithMessage("Valid tour id is required.");
            RuleFor(x => x.TitleEng).NotEmpty().MaximumLength(200);
            RuleFor(x => x.TitleAr).NotEmpty().MaximumLength(200);
            RuleFor(x => x.DestinationId).GreaterThan(0).WithMessage("Destination is required.");
            RuleFor(x => x.CityId)
                .NotNull().GreaterThan(0)
                .WithMessage("City is required.");
            //RuleFor(x => x.CurrencyId).GreaterThan(0).WithMessage("Currency is required.");
            RuleFor(x => x.PricePerPerson).GreaterThan(0);
            RuleFor(x => x.PricePerChild).GreaterThanOrEqualTo(0);
            RuleFor(x => x.MaxSeats).GreaterThan(0);
            RuleFor(x => x.DurationDays).GreaterThanOrEqualTo(0);
            RuleFor(x => x.Durationhours).InclusiveBetween(0, 23);
            RuleFor(x => x.StartDate).NotEmpty();
            RuleFor(x => x.EndDate)
                .GreaterThanOrEqualTo(x => x.StartDate)
                .WithMessage("End date must be after start date.");
        }
    }

    public class AddTourImageDTOValidator : AbstractValidator<AddTourImageDTO>
    {
        public AddTourImageDTOValidator()
        {
            RuleFor(x => x.TourId).GreaterThan(0);
            RuleFor(x => x.Images).NotNull().NotEmpty();
            RuleForEach(x => x.Images)
                .Must(image => image.Length > 0)
                .WithMessage("Uploaded images cannot be empty.");
            RuleFor(x => x.CoverImageIndex)
                .GreaterThanOrEqualTo(0)
                .LessThan(x => x.Images == null ? 0 : x.Images.Count)
                .When(x => x.CoverImageIndex.HasValue)
                .WithMessage("The selected cover image must be part of the upload.");
        }
    }

    public class AddTourItenraryDTOValidator : AbstractValidator<AddTourItenraryDTO>
    {
        public AddTourItenraryDTOValidator()
        {
            RuleFor(x => x.TourId).GreaterThan(0);
            RuleFor(x => x.Itinerary).NotNull().NotEmpty();
            RuleForEach(x => x.Itinerary).SetValidator(new CreateTourItineraryDTOValidator());
        }
    }

    internal static class TourItineraryValidation
    {
        public static IEnumerable<CreateTourItineraryDTO> Flatten(
            IEnumerable<CreateTourItineraryDTO>? itinerary)
        {
            foreach (var item in itinerary ?? Enumerable.Empty<CreateTourItineraryDTO>())
            {
                yield return item;

                foreach (var child in Flatten(item.Childs))
                    yield return child;
            }
        }
    }
}
