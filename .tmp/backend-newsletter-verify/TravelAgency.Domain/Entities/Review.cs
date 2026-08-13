using System;
using System.Collections.Generic;
using System.Text;

namespace TravelAgency.Domain.Entities
{
    public class Review
    {
        public int Id { get; set; }
        public int TourId { get; set; }
        public Tour Tour { get; set; } = default!;
        public int UserId { get; set; }
        public User User { get; set; } = default!;
        public int Rating { get; set; } // 1-5
        public string? Comment { get; set; }
    }
}
