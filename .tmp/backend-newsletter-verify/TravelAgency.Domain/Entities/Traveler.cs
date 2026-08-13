using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using TravelAgency.Domain.Enums;

namespace TravelAgency.Domain.Entities
{
    public class Traveler
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string PassportNumber { get; set; } = null!;
        public DateOnly? DateOfBirth { get; set; }
        public GenderEnum Gender { get; set; }
        public TravelerTypeEnum TravelerType { get; set; }
        public string Relationship { get; set; } = string.Empty;
        public bool IsPrimary { get; set; } = false;

        // Navigation
        public int? CustomerId { get; set; }
        public Customer? Customer { get; set; }
    }
}
