

namespace TravelAgency.Domain.Entities.Logger
{
    public class Logg
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Level { get; set; } = string.Empty;
        public string? Message { get; set; }
        public string? Logger { get; set; }
        public string? Exception { get; set; }
    }
}
