namespace TravelAgency.Domain.Entities
{
    public class WebsiteVisitor
    {
        public int Id { get; set; }
        public Guid VisitorId { get; set; }
        public DateTime FirstVisitedAtUtc { get; set; }
        public DateTime LastVisitedAtUtc { get; set; }
        public int VisitCount { get; set; }
    }
}
