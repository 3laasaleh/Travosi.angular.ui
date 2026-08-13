using FluentValidation;
using TravelAgency.Application.DTOs.Crm;
using TravelAgency.Domain.Enums;

namespace TravelAgency.Application.Validators
{
    public class CreateCustomerDTOValidator : AbstractValidator<CreateCustomerDTO>
    {
        public CreateCustomerDTOValidator()
        {
            RuleFor(x => x.CustomerType).IsInEnum();
            RuleFor(x => x.FirstName).NotEmpty().MaximumLength(100);
            RuleFor(x => x.LastName).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Mobile).NotEmpty().MaximumLength(20).Matches(@"^\+?[0-9 ()-]{7,20}$");
            RuleFor(x => x.PassportNumber).NotEmpty().MaximumLength(20);
            RuleFor(x => x.DateOfBirth).NotNull().LessThanOrEqualTo(DateOnly.FromDateTime(DateTime.UtcNow));
            RuleFor(x => x.Gender).IsInEnum();

            When(x => x.CustomerType == CustomerTypeEnum.Company, () =>
            {
                RuleFor(x => x.CompanyName).NotEmpty().WithMessage("Company name is required for company customers.");
            });

            RuleFor(x => x.Travelers).Must(x => x.Count == 1)
                .When(x => x.CustomerType == CustomerTypeEnum.Couple)
                .WithMessage("A couple must include one companion traveler.");
            RuleFor(x => x.Travelers).NotEmpty()
                .When(x => x.CustomerType == CustomerTypeEnum.Family)
                .WithMessage("A family must include at least one companion traveler.");
            RuleFor(x => x.Travelers).Empty()
                .When(x => x.CustomerType == CustomerTypeEnum.Individual)
                .WithMessage("An individual customer cannot include companion travelers. Select Family or Company instead.");
            RuleForEach(x => x.Travelers).ChildRules(traveler =>
            {
                traveler.RuleFor(x => x.FirstName).NotEmpty().MaximumLength(100);
                traveler.RuleFor(x => x.LastName).NotEmpty().MaximumLength(100);
                traveler.RuleFor(x => x.PassportNumber).NotEmpty().MaximumLength(20);
                traveler.RuleFor(x => x.DateOfBirth).NotNull().LessThanOrEqualTo(DateOnly.FromDateTime(DateTime.UtcNow));
                traveler.RuleFor(x => x.Gender).IsInEnum();
                traveler.RuleFor(x => x.TravelerType).IsInEnum();
                traveler.RuleFor(x => x.Relationship).NotEmpty().MaximumLength(50);
            });
        }
    }

    public class UpdateCustomerDTOValidator : AbstractValidator<UpdateCustomerDTO>
    {
        public UpdateCustomerDTOValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0);
            Include(new CreateCustomerDTOValidator());
        }
    }

    public class CreateTravelerDTOValidator : AbstractValidator<CreateTravelerDTO>
    {
        public CreateTravelerDTOValidator()
        {
            RuleFor(x => x.CustomerId).GreaterThan(0).WithMessage("Customer is required.");
            RuleFor(x => x.FirstName).NotEmpty().MaximumLength(100);
            RuleFor(x => x.LastName).NotEmpty().MaximumLength(100);
            RuleFor(x => x.PassportNumber).NotEmpty().MaximumLength(20);
            RuleFor(x => x.Gender).IsInEnum();
            RuleFor(x => x.TravelerType).IsInEnum();
            RuleFor(x => x.Relationship).MaximumLength(50);
        }
    }

    public class UpdateTravelerDTOValidator : AbstractValidator<UpdateTravelerDTO>
    {
        public UpdateTravelerDTOValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0);
            RuleFor(x => x.CustomerId).GreaterThan(0).WithMessage("Customer is required.");
            RuleFor(x => x.FirstName).NotEmpty().MaximumLength(100);
            RuleFor(x => x.LastName).NotEmpty().MaximumLength(100);
            RuleFor(x => x.PassportNumber).NotEmpty().MaximumLength(20);
            RuleFor(x => x.Gender).IsInEnum();
            RuleFor(x => x.TravelerType).IsInEnum();
        }
    }
}
