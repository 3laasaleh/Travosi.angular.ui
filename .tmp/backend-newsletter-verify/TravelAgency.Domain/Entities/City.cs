

namespace TravelAgency.Domain.Entities
{
    public class City
    {
        public int Id { get; set; }
        public string? NameEng { get; set; }
        public string? NameAr { get; set; }
        public int? DestinationId { get; set; }
        public Destination? Destination { get; set; }
        public ICollection<Tour> Tours { get; set; } = new List<Tour>();
        public bool IsActive { get; set; } = true;

    }
}
