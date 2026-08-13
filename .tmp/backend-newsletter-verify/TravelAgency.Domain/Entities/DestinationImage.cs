using System;
using System.Collections.Generic;
using System.Text;

namespace TravelAgency.Domain.Entities
{
    public class DestinationImage
    {
        public int Id { get; set; }
        public string? ImageName { get; set; }
        public string? ImageUrl { get; set; }
        public string? ImageSize { get; set; }

        public int DestinationId { get; set; }
        public Destination? Destination { get; set; }

    }

   
}
