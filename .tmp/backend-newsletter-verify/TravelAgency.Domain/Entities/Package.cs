using System;
using System.Collections.Generic;
using System.Text;

namespace TravelAgency.Domain.Entities
{
    public class Package
    {
        public int Id { get; set; }
        public string NameEng { get; set; } = default!;
        public string NameAr { get; set; } = default!;
        public string Description { get; set; } = default!;
        public int DurationDays { get; set; }
        public int DurationHours { get; set; }
        public decimal PricePerPerson { get; set; }
        public decimal PricePerChild { get; set; }
        // Existing package prices were stored as USD. Keep that safe default
        // while allowing every package to declare its own source currency.
        public int CurrencyId { get; set; } = 2;
        public Currency? Currency { get; set; }
        public int MaxCapacity { get; set; }
        public int SeatsBooked { get; set; }
        public int SeatsAvailable => MaxCapacity <= 0 ? int.MaxValue : Math.Max(0, MaxCapacity - SeatsBooked);
        public bool IsActive { get; set; }

        public string CancellationPolicy { get; set; } = string.Empty;
        public bool IsFreeCancelation { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public ICollection<PackageItinerary> Itinerary { get; set; }=new List<PackageItinerary>();
        public ICollection<PackageImage> Images { get; set; } = new List<PackageImage>();
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
        public ICollection<PackageDestination> PackageDestination { get; set; } = new List<PackageDestination>();
    }
}
