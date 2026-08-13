using System;
using System.Collections.Generic;
using System.Text;

namespace TravelAgency.Domain.Entities
{
    public class PackageItinerary
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public PackageItinerary? Parent { get; set; }
        public ICollection<PackageItinerary> Childs { get; set; } = new List<PackageItinerary>();
        public bool IsChildNode { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int DayNumber { get; set; }
        public TimeOnly? StartTime { get; set; }
        public TimeOnly? EndTime { get; set; }
        public int? PackageId { get; set; }
        public Package? Package { get; set; }
    }
}
