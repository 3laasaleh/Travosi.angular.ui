using System;
using System.Collections.Generic;
using System.Text;

namespace TravelAgency.Domain.Entities
{
    public class Hotel 
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;


        public int StarRating { get; set; }

        public string? Address { get; set; }

        public string? Description { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Email { get; set; }

        public string? Website { get; set; }

        public bool IsActive { get; set; }

        // Navigation
        public int DestinationId { get; set; }
        public Destination Destination { get; set; } = null!;

        public ICollection<HotelRoom> Rooms { get; set; } = new List<HotelRoom>();
    }
}
