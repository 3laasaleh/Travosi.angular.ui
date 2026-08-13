using FluentValidation;
using TravelAgency.Application.DTOs.Geography;

namespace TravelAgency.Application.Validators
{
    public class CreateCityDTOValidator : AbstractValidator<CreateCityDTO>
    {
        public CreateCityDTOValidator()
        {
            RuleFor(x => x.NameEng).NotEmpty().MaximumLength(150);
            RuleFor(x => x.NameAr).NotEmpty().MaximumLength(150);
            RuleFor(x => x.DestinationId)
                .NotNull().GreaterThan(0)
                .WithMessage("Destination is required.");
        }
    }

    public class UpdateCityDTOValidator : AbstractValidator<UpdateCityDTO>
    {
        public UpdateCityDTOValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0);
            RuleFor(x => x.NameEng).NotEmpty().MaximumLength(150);
            RuleFor(x => x.NameAr).NotEmpty().MaximumLength(150);
            RuleFor(x => x.DestinationId)
                .NotNull().GreaterThan(0)
                .WithMessage("Destination is required.");
        }
    }
}
