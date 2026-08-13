using System;
using System.Collections.Generic;
using System.Text;

namespace TravelAgency.Domain.Entities
{
    public class TourExclude
    {
        public int Id { get; set; }
        public string Value { get; set; } = string.Empty;
        public int TourId { get; set; }
        public Tour? Tour { get; set; }
    }
}
