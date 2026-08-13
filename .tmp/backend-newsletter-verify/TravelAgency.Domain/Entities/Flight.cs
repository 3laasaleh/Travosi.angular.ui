
using TravelAgency.Domain.Enums;

namespace TravelAgency.Domain.Entities
{
    public class Flight
    {
        public int Id { get; set; }
        public string? FlightNumber { get; set; }
        public int AirlineId { get; set; }
        public Airline? Airline { get; set; }
        public string? DepartureAirport { get; set; }
        public string? ArrivalAirport { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public decimal Price { get; set; }
        public int AvailableSeats { get; set; }
        public FlightClassEnum FlightClass { get; set; }
        public bool IsActive { get; set; } = true;

}
}
