using FluentValidation;
using TravelAgency.Application.DTOs.Quotations;
using TravelAgency.Domain.Enums;

namespace TravelAgency.Application.Validators
{
    public class CreateQuotationItemDTOValidator : AbstractValidator<CreateQuotationItemDTO>
    {
        public CreateQuotationItemDTOValidator()
        {
            RuleFor(x => x.ItemType).IsInEnum();
            RuleFor(x => x.Description).NotEmpty().MaximumLength(500);
            RuleFor(x => x.Quantity).GreaterThan(0);
            RuleFor(x => x.CostPrice).GreaterThanOrEqualTo(0);
            RuleFor(x => x.SellingPrice).GreaterThanOrEqualTo(0);
            RuleFor(x => x.Discount).GreaterThanOrEqualTo(0);

            RuleFor(x => x)
                .Must(x => x.Discount <= x.SellingPrice * x.Quantity)
                .WithMessage("Line discount cannot exceed the line gross amount (selling price x quantity).");

            // The linked entity must match the declared item type.
            RuleFor(x => x.PackageId).NotNull().GreaterThan(0)
                .When(x => x.ItemType == QuotationItemTypeEnum.Package)
                .WithMessage("PackageId is required for a Package item.");
            RuleFor(x => x.TourId).NotNull().GreaterThan(0)
                .When(x => x.ItemType == QuotationItemTypeEnum.Tour)
                .WithMessage("TourId is required for a Tour item.");
            RuleFor(x => x.HotelId).NotNull().GreaterThan(0)
                .When(x => x.ItemType == QuotationItemTypeEnum.Hotel)
                .WithMessage("HotelId is required for a Hotel item.");
            RuleFor(x => x.FlightId).NotNull().GreaterThan(0)
                .When(x => x.ItemType == QuotationItemTypeEnum.Flight)
                .WithMessage("FlightId is required for a Flight item.");

            RuleFor(x => x)
                .Must(x => CountReferences(x) <= 1)
                .WithMessage("A quotation line can reference only one of package, tour, hotel or flight.");
        }

        private static int CountReferences(CreateQuotationItemDTO x)
        {
            var count = 0;
            if (x.PackageId is > 0) count++;
            if (x.TourId is > 0) count++;
            if (x.HotelId is > 0) count++;
            if (x.FlightId is > 0) count++;
            return count;
        }
    }

    public class CreateQuotationDTOValidator : AbstractValidator<CreateQuotationDTO>
    {
        public CreateQuotationDTOValidator()
        {
            RuleFor(x => x.CustomerId).GreaterThan(0).WithMessage("Customer is required.");
            RuleFor(x => x.CurrencyId).GreaterThan(0).WithMessage("Currency is required.");
            RuleFor(x => x.Adults).GreaterThan(0).WithMessage("At least one adult is required.");
            RuleFor(x => x.Children).GreaterThanOrEqualTo(0);
            RuleFor(x => x.Infants).GreaterThanOrEqualTo(0);
            RuleFor(x => x.ExchangeRate).GreaterThan(0);
            RuleFor(x => x.Discount).GreaterThanOrEqualTo(0);
            RuleFor(x => x.TaxRate).InclusiveBetween(0, 100).WithMessage("Tax rate must be a percentage between 0 and 100.");
            RuleFor(x => x.TravelEndDate)
                .GreaterThanOrEqualTo(x => x.TravelStartDate)
                .WithMessage("Travel end date must be after start date.");
            RuleFor(x => x.TravelStartDate)
                .GreaterThanOrEqualTo(DateOnly.FromDateTime(DateTime.UtcNow))
                .WithMessage("Travel start date cannot be in the past.");
            RuleFor(x => x.ValidUntil)
                .GreaterThanOrEqualTo(DateOnly.FromDateTime(DateTime.UtcNow))
                .WithMessage("The quotation validity date cannot be in the past.");
            RuleFor(x => x.ValidUntil)
                .LessThanOrEqualTo(x => x.TravelStartDate)
                .WithMessage("The quotation must expire on or before the travel start date.");
            RuleFor(x => x.Items).NotEmpty().WithMessage("A quotation must contain at least one item.");
            RuleForEach(x => x.Items).SetValidator(new CreateQuotationItemDTOValidator());

            RuleFor(x => x)
                .Must(x => x.Discount <= x.Items.Sum(i => i.SellingPrice * i.Quantity - i.Discount))
                .WithMessage("The overall discount cannot exceed the quotation subtotal.");
        }
    }

    public class UpdateQuotationDTOValidator : AbstractValidator<UpdateQuotationDTO>
    {
        public UpdateQuotationDTOValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0);
            RuleFor(x => x.CustomerId).GreaterThan(0).WithMessage("Customer is required.");
            RuleFor(x => x.CurrencyId).GreaterThan(0).WithMessage("Currency is required.");
            RuleFor(x => x.Adults).GreaterThan(0);
            RuleFor(x => x.ExchangeRate).GreaterThan(0);
            RuleFor(x => x.Discount).GreaterThanOrEqualTo(0);
            RuleFor(x => x.TaxRate).InclusiveBetween(0, 100).WithMessage("Tax rate must be a percentage between 0 and 100.");
            RuleFor(x => x.TravelEndDate)
                .GreaterThanOrEqualTo(x => x.TravelStartDate)
                .WithMessage("Travel end date must be after start date.");
            RuleFor(x => x.ValidUntil)
                .LessThanOrEqualTo(x => x.TravelStartDate)
                .WithMessage("The quotation must expire on or before the travel start date.");
            RuleFor(x => x.Items).NotEmpty().WithMessage("A quotation must contain at least one item.");
            RuleForEach(x => x.Items).SetValidator(new CreateQuotationItemDTOValidator());

            RuleFor(x => x)
                .Must(x => x.Discount <= x.Items.Sum(i => i.SellingPrice * i.Quantity - i.Discount))
                .WithMessage("The overall discount cannot exceed the quotation subtotal.");
        }
    }

    public class ChangeQuotationStatusDTOValidator : AbstractValidator<ChangeQuotationStatusDTO>
    {
        public ChangeQuotationStatusDTOValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0);
            RuleFor(x => x.Status).IsInEnum();
        }
    }
}
