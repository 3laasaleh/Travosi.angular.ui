using System;
using System.Collections.Generic;
using System.Text;

namespace TravelAgency.Domain.Entities
{
    public class Destination
    {
        public int Id { get; set; }
        public string NameEng { get; set; } = default!;
        public string NameAr { get; set; } = default!;
        public string? SubDescription { get; set; }
        public string? Description { get; set; }
        public bool IsActive { get; set; } = true;

        public ICollection<DestinationImage> Images { get; set; } = new List<DestinationImage>();
        public ICollection<City> Cities { get; set; } = new List<City>();
        public ICollection<Tour> Tours { get; set; } = new List<Tour>();
        public ICollection<Hotel> Hotels { get; set; } = new List<Hotel>();
        public ICollection<PackageDestination> PackageDestination { get; set; } = new List<PackageDestination>();

    }
}
