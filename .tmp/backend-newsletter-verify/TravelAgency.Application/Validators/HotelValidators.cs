using FluentValidation;
using TravelAgency.Application.DTOs.Hotels;

namespace TravelAgency.Application.Validators
{
    public class CreateHotelDTOValidator : AbstractValidator<CreateHotelDTO>
    {
        public CreateHotelDTOValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
            RuleFor(x => x.StarRating).InclusiveBetween(1, 5);
            RuleFor(x => x.DestinationId).GreaterThan(0).WithMessage("Destination is required.");
            RuleFor(x => x.Email).EmailAddress().When(x => !string.IsNullOrWhiteSpace(x.Email));
            RuleFor(x => x.Address).MaximumLength(400);
            RuleFor(x => x.Description).MaximumLength(4000);
        }
    }

    public class UpdateHotelDTOValidator : AbstractValidator<UpdateHotelDTO>
    {
        public UpdateHotelDTOValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0);
            RuleFor(x => x.Name).NotEmpty().MaximumLength(200);
            RuleFor(x => x.StarRating).InclusiveBetween(1, 5);
            RuleFor(x => x.DestinationId).GreaterThan(0).WithMessage("Destination is required.");
            RuleFor(x => x.Email).EmailAddress().When(x => !string.IsNullOrWhiteSpace(x.Email));
        }
    }

    public class CreateHotelRoomDTOValidator : AbstractValidator<CreateHotelRoomDTO>
    {
        public CreateHotelRoomDTOValidator()
        {
            RuleFor(x => x.HotelId).GreaterThan(0).WithMessage("Hotel is required.");
            RuleFor(x => x.Name).NotEmpty().MaximumLength(150);
            RuleFor(x => x.RoomType).IsInEnum();
            RuleFor(x => x.MealPlan).IsInEnum();
            RuleFor(x => x.MaxAdults).GreaterThan(0);
            RuleFor(x => x.MaxChildren).GreaterThanOrEqualTo(0);
            RuleFor(x => x.CostPrice).GreaterThanOrEqualTo(0);
            RuleFor(x => x.SellingPrice).GreaterThanOrEqualTo(x => x.CostPrice)
                .WithMessage("Selling price must be greater than or equal to cost price.");
        }
    }

    public class UpdateHotelRoomDTOValidator : AbstractValidator<UpdateHotelRoomDTO>
    {
        public UpdateHotelRoomDTOValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0);
            RuleFor(x => x.HotelId).GreaterThan(0).WithMessage("Hotel is required.");
            RuleFor(x => x.Name).NotEmpty().MaximumLength(150);
            RuleFor(x => x.RoomType).IsInEnum();
            RuleFor(x => x.MealPlan).IsInEnum();
            RuleFor(x => x.MaxAdults).GreaterThan(0);
            RuleFor(x => x.MaxChildren).GreaterThanOrEqualTo(0);
            RuleFor(x => x.CostPrice).GreaterThanOrEqualTo(0);
            RuleFor(x => x.SellingPrice).GreaterThanOrEqualTo(x => x.CostPrice)
                .WithMessage("Selling price must be greater than or equal to cost price.");
        }
    }
}
