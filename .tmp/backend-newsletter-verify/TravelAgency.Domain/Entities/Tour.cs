
namespace TravelAgency.Domain.Entities
{
    public class Tour
    {
        public int Id { get; set; }
        public string TitleEng { get; set; } = default!;
        public string TitleAr { get; set; } = default!;
        public int DestinationId { get; set; }
        public Destination Destination { get; set; } = default!;
        // Nullable only to preserve tours that existed before cities were
        // introduced under destinations. New and edited tours must select one.
        public int? CityId { get; set; }
        public City? City { get; set; }

        public string? Description { get; set; }
        public string? FullDescription { get; set; }
        public decimal PricePerPerson { get; set; }
        public decimal PricePerChild { get; set; }
        public int CurrencyId { get; set; } = 2;
        public Currency? Currency { get; set; } 
        public int DurationDays { get; set; }
        public int Durationhours { get; set; }
        public int SeatsBooked { get; set; } = 0;
        public int MaxSeats { get; set; } = 14;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? CoverImageUrl { get; set; }
        public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
        public ICollection<TourImage> Images { get; set; } = new List<TourImage>();
        public ICollection<Review> Reviews { get; set; } = new List<Review>();
        public int SeatsAvailable => MaxSeats - SeatsBooked;
        public ICollection<TourHighlight> Highlights { get; set; } = new List<TourHighlight>();
        public ICollection<TourInclude> Includes { get; set; } = new List<TourInclude>();
        public ICollection<TourExclude> Excludes { get; set; } = new List<TourExclude>();
        public ICollection<TourItinerary> Itinerary { get; set; } = new List<TourItinerary>();

        public string CancellationPolicy { get; set; } = string.Empty;
        public bool IsFreeCancelation { get; set; }

        public bool IsActive { get; set; } = true;
    }
}
