using FluentValidation;
using TravelAgency.Application.DTOs.Bookings;
using TravelAgency.Domain.Enums;

namespace TravelAgency.Application.Validators
{
    public class CreateBookingDTOValidator : AbstractValidator<CreateBookingDTO>
    {
        public CreateBookingDTOValidator()
        {
            RuleFor(x => x.NumberOfTravelers).GreaterThan(0).WithMessage("At least one traveler is required.");
            RuleFor(x => x.DateFrom).NotEmpty();
            RuleFor(x => x.DateTo)
                .GreaterThanOrEqualTo(x => x.DateFrom)
                .WithMessage("Date to must be after date from.");

            RuleFor(x => x)
                .Must(x => x.TourId.HasValue ^ x.PackageId.HasValue)
                .WithMessage("Select exactly one tour or package.");

            RuleFor(x => x.TourId).GreaterThan(0).When(x => x.TourId.HasValue);
            RuleFor(x => x.PackageId).GreaterThan(0).When(x => x.PackageId.HasValue);
            RuleFor(x => x.SpecialRequests).MaximumLength(1000);
            RuleFor(x => x.Adults).GreaterThan(0).When(x => x.Adults.HasValue);
            RuleFor(x => x.Children).GreaterThanOrEqualTo(0).When(x => x.Children.HasValue);
        }
    }

    public class UpdateBookingDTOValidator : AbstractValidator<UpdateBookingDTO>
    {
        public UpdateBookingDTOValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0).WithMessage("Valid booking id is required.");
            RuleFor(x => x.NumberOfTravelers).GreaterThan(0);
            RuleFor(x => x.DateFrom).NotEmpty();
            RuleFor(x => x.DateTo)
                .GreaterThanOrEqualTo(x => x.DateFrom)
                .WithMessage("Date to must be after date from.");
            RuleFor(x => x.SpecialRequests).MaximumLength(1000);
        }
    }

    public class ChangeBookingStatusDTOValidator : AbstractValidator<ChangeBookingStatusDTO>
    {
        public ChangeBookingStatusDTOValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0).WithMessage("Valid booking id is required.");
            RuleFor(x => x.Status).IsInEnum();
            RuleFor(x => x.Status)
                .NotEqual(BookingStatusEnum.Pending)
                .WithMessage("Booking status can only be moved out of Pending.");
            RuleFor(x => x.CancellationFeeAmount)
                .GreaterThanOrEqualTo(0)
                .When(x => x.CancellationFeeAmount.HasValue);
            RuleFor(x => x.Note).MaximumLength(1000);
        }
    }
}
