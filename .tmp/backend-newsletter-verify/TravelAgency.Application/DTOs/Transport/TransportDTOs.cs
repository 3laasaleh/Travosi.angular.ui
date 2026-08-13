using Microsoft.AspNetCore.Http;
using TravelAgency.Domain.Enums;

namespace TravelAgency.Application.DTOs.Transport
{
    public class AirportSearchDTO
    {
        public string PlaceId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string DisplayName => string.IsNullOrWhiteSpace(Description)
            ? Name
            : Description;
    }

    public class AirlineDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Code { get; set; }
        public string? LogoUrl { get; set; }
        public bool IsActive { get; set; }
    }

    public class CreateAirlineDTO
    {
        public string? Name { get; set; }
        public string? Code { get; set; }
        public IFormFile? Logo { get; set; }
    }

    public class UpdateAirlineDTO : CreateAirlineDTO
    {
        public int Id { get; set; }
    }

    public class FlightDTO
    {
        public int Id { get; set; }
        public string FlightNumber { get; set; } = string.Empty;
        public int AirlineId { get; set; }
        public string? AirlineName { get; set; }
        public string DepartureAirport { get; set; } = string.Empty;
        public string ArrivalAirport { get; set; } = string.Empty;
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public decimal Price { get; set; }
        public int AvailableSeats { get; set; }
        public FlightClassEnum FlightClass { get; set; }
        public string FlightClassName => FlightClass.ToString();
        public bool IsActive { get; set; }
    }

    public class CreateFlightDTO
    {
        public string FlightNumber { get; set; } = string.Empty;
        public int AirlineId { get; set; }
        public string DepartureAirport { get; set; } = string.Empty;
        public string ArrivalAirport { get; set; } = string.Empty;
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public decimal Price { get; set; }
        public int AvailableSeats { get; set; }
        public FlightClassEnum FlightClass { get; set; }
    }

    public class UpdateFlightDTO : CreateFlightDTO
    {
        public int Id { get; set; }
    }
}
