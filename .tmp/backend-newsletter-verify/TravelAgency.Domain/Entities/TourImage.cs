using System;
using System.Collections.Generic;
using System.Text;

namespace TravelAgency.Domain.Entities
{
    public class TourImage
    {
        public int Id { get; set; }
        public string? ImageName { get; set; }
        public string? ImageUrl { get; set; }
        public string? ImageSize { get; set; }
        public int TourId { get; set; }
        public Tour? Tour { get; set; }

    }
}
