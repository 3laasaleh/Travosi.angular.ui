using FluentValidation;
using TravelAgency.Application.DTOs;
using TravelAgency.Domain.Enums;

namespace TravelAgency.Application.Validators
{
    public class UserRegisterationDTOValidator : AbstractValidator<UserRegisterationDTO>
    {
        public UserRegisterationDTOValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty().MinimumLength(2).MaximumLength(100);
            RuleFor(x => x.LastName).NotEmpty().MinimumLength(2).MaximumLength(100);
            RuleFor(x => x.Email).NotEmpty().EmailAddress().MaximumLength(256);
            RuleFor(x => x.Mobile).NotEmpty().MaximumLength(20)
                .Matches(@"^\+?[0-9 ()-]{7,20}$");
            RuleFor(x => x.Password).NotEmpty().MinimumLength(6);
            RuleFor(x => x.ConfirmPassword).Equal(x => x.Password)
                .WithMessage("Passwords do not match.");
            RuleFor(x => x.DateOfBirth).NotNull()
                .LessThanOrEqualTo(DateOnly.FromDateTime(DateTime.UtcNow));
            RuleFor(x => x.Gender).IsInEnum();
            RuleFor(x => x.PassportNumber).NotEmpty().MaximumLength(20);
        }
    }
}
