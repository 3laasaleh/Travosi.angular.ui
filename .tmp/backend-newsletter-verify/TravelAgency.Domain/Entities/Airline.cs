using System;
using System.Collections.Generic;
using System.Text;

namespace TravelAgency.Domain.Entities
{
    public class Airline
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Code { get; set; } // IATA code
        public string? LogoUrl { get; set; }
        public bool IsActive { get; set; }

        public ICollection<Flight>? Flights { get; set; }
    }
}
