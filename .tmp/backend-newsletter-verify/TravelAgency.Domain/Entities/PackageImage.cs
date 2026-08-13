namespace TravelAgency.Domain.Entities
{
    public class PackageImage
    {
        public int Id { get; set; }
        public string? ImageName { get; set; }
        public string? ImageUrl { get; set; }
        public string? ImageSize { get; set; }
        public int PackageId { get; set; }
        public Package? Package { get; set; }
    }
}
