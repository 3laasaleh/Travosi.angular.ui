namespace TravelAgency.Domain.Entities
{
    public class BlogImage
    {
        public int Id { get; set; }
        public string ImageName { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public string? ImageSize { get; set; }
        public int BlogId { get; set; }
        public Blog? Blog { get; set; }
    }
}
