using System;
using System.Collections.Generic;
using System.Text;
using TravelAgency.Domain.Enums;

namespace TravelAgency.Domain.Entities
{
    public class Customer
    {
        public int Id { get; set; }
        public CustomerTypeEnum CustomerType { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? CompanyName { get; set; }
        public string Email { get; set; } = null!;
        public string Mobile { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public bool IsActive { get; set; } = true;

        // The agent this customer is assigned to (null = unassigned)
        public int? AgentId { get; set; }
        public User? Agent { get; set; }

        // Navigation Properties
        public ICollection<Traveler> Travelers { get; set; } = new List<Traveler>();
        public ICollection<Quotation> Quotations { get; set; } = new List<Quotation>();
    }
}
