namespace TravelAgency.Domain.Entities
{
    public class Blog
    {
        public int Id { get; set; }
        public string TitleEng { get; set; } = string.Empty;
        public string TitleAr { get; set; } = string.Empty;
        public string? SummaryEng { get; set; }
        public string? SummaryAr { get; set; }
        public string ContentEng { get; set; } = string.Empty;
        public string ContentAr { get; set; } = string.Empty;
        public DateTime PublishedAt { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true;

        public ICollection<BlogImage> Images { get; set; } = new List<BlogImage>();
    }
}
