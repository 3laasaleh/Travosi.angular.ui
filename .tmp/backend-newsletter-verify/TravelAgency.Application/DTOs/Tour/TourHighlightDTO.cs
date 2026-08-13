using System;
using System.Collections.Generic;
using System.Text;

namespace TravelAgency.Application.DTOs.Tour
{
    public class TourHighlightDTO
    {
        public int Id { get; set; }
        public string Value { get; set; } = string.Empty;
    }
    public class TourIncludeDTO
    {
        public int Id { get; set; }
        public string Value { get; set; } = string.Empty;
    }
    public class TourExcludeDTO
    {
        public int Id { get; set; }
        public string Value { get; set; } = string.Empty;
    }

}
