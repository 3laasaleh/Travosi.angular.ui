using System;
using System.Collections.Generic;
using System.Text;

namespace TravelAgency.Domain.Entities
{
    public class TourItinerary
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public TourItinerary? Parent { get; set; }
        public ICollection<TourItinerary> Childs { get; set; } = new List<TourItinerary>();
        public bool IsChildNode { get; set; }
        public string Title { get; set; } =string.Empty;
        public string Value { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int DayNumber { get; set; }
        public TimeOnly? StartTime { get; set; }
        public TimeOnly? EndTime { get; set; }
        public int? TourId { get; set; }
        public Tour? Tour { get; set; }


    }
}
