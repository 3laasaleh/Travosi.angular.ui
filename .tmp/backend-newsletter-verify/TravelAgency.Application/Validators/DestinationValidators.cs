using FluentValidation;
using TravelAgency.Application.DTOs.Destinations;

namespace TravelAgency.Application.Validators
{
    public class CreateDestinationDTOValidator : AbstractValidator<CreateDestinationDTO>
    {
        public CreateDestinationDTOValidator()
        {
            RuleFor(x => x.NameEng)
                .NotEmpty().WithMessage("English name is required.")
                .MaximumLength(150);

            RuleFor(x => x.NameAr)
                .NotEmpty().WithMessage("Arabic name is required.")
                .MaximumLength(150);

            RuleFor(x => x.SubDescription).MaximumLength(500);
            RuleFor(x => x.Description).MaximumLength(4000);
        }
    }

    public class UpdateDestinationDTOValidator : AbstractValidator<UpdateDestinationDTO>
    {
        public UpdateDestinationDTOValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0).WithMessage("Valid destination id is required.");

            RuleFor(x => x.NameEng)
                .NotEmpty().WithMessage("English name is required.")
                .MaximumLength(150);

            RuleFor(x => x.NameAr)
                .NotEmpty().WithMessage("Arabic name is required.")
                .MaximumLength(150);

            RuleFor(x => x.SubDescription).MaximumLength(500);
            RuleFor(x => x.Description).MaximumLength(4000);
        }
    }

    public class ChangeStatusDTOValidator : AbstractValidator<ChangeStatusDTO>
    {
        public ChangeStatusDTOValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0).WithMessage("Valid id is required.");
        }
    }
}
