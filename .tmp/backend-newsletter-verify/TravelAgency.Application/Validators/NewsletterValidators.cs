using FluentValidation;
using TravelAgency.Application.DTOs.Newsletter;

namespace TravelAgency.Application.Validators
{
    public class SubscribeNewsletterDTOValidator : AbstractValidator<SubscribeNewsletterDTO>
    {
        public SubscribeNewsletterDTOValidator()
        {
            RuleFor(model => model.Email)
                .Cascade(CascadeMode.Stop)
                .NotEmpty()
                .MaximumLength(254)
                .EmailAddress();
        }
    }
}
