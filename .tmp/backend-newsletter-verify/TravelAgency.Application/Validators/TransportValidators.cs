using FluentValidation;
using TravelAgency.Application.DTOs.Transport;

namespace TravelAgency.Application.Validators
{
    public class CreateAirlineDTOValidator : AbstractValidator<CreateAirlineDTO>
    {
        public CreateAirlineDTOValidator()
        {
            RuleFor(x => x.Name).NotEmpty().MaximumLength(150);
            RuleFor(x => x.Code).NotEmpty().MaximumLength(4).WithMessage("IATA code is required (max 4 chars).");
            RuleFor(x => x.Logo).NotNull().WithMessage("Airline logo is required.");
        }
    }

    public class UpdateAirlineDTOValidator : AbstractValidator<UpdateAirlineDTO>
    {
        public UpdateAirlineDTOValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0);
            RuleFor(x => x.Name).NotEmpty().MaximumLength(150);
            RuleFor(x => x.Code).NotEmpty().MaximumLength(4);
        }
    }

    public class CreateFlightDTOValidator : AbstractValidator<CreateFlightDTO>
    {
        public CreateFlightDTOValidator()
        {
            RuleFor(x => x.FlightNumber).NotEmpty().MaximumLength(20);
            RuleFor(x => x.AirlineId).GreaterThan(0).WithMessage("Airline is required.");
            RuleFor(x => x.DepartureAirport).NotEmpty().MaximumLength(250);
            RuleFor(x => x.ArrivalAirport).NotEmpty().MaximumLength(250);
            RuleFor(x => x)
                .Must(x => !string.Equals(
                    x.DepartureAirport?.Trim(),
                    x.ArrivalAirport?.Trim(),
                    StringComparison.OrdinalIgnoreCase))
                .WithMessage("Departure and arrival airports must be different.");
            RuleFor(x => x.ArrivalTime).GreaterThan(x => x.DepartureTime)
                .WithMessage("Arrival time must be after departure time.");
            RuleFor(x => x.Price).GreaterThanOrEqualTo(0);
            RuleFor(x => x.AvailableSeats).GreaterThanOrEqualTo(0);
            RuleFor(x => x.FlightClass).IsInEnum();
        }
    }

    public class UpdateFlightDTOValidator : AbstractValidator<UpdateFlightDTO>
    {
        public UpdateFlightDTOValidator()
        {
            RuleFor(x => x.Id).GreaterThan(0);
            RuleFor(x => x.FlightNumber).NotEmpty().MaximumLength(20);
            RuleFor(x => x.AirlineId).GreaterThan(0).WithMessage("Airline is required.");
            RuleFor(x => x.DepartureAirport).NotEmpty().MaximumLength(250);
            RuleFor(x => x.ArrivalAirport).NotEmpty().MaximumLength(250);
            RuleFor(x => x)
                .Must(x => !string.Equals(
                    x.DepartureAirport?.Trim(),
                    x.ArrivalAirport?.Trim(),
                    StringComparison.OrdinalIgnoreCase))
                .WithMessage("Departure and arrival airports must be different.");
            RuleFor(x => x.ArrivalTime).GreaterThan(x => x.DepartureTime)
                .WithMessage("Arrival time must be after departure time.");
            RuleFor(x => x.Price).GreaterThanOrEqualTo(0);
            RuleFor(x => x.AvailableSeats).GreaterThanOrEqualTo(0);
            RuleFor(x => x.FlightClass).IsInEnum();
        }
    }
}
