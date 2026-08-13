
using TravelAgency.Domain.Enums;

namespace TravelAgency.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Mobile { get; set; } = string.Empty;
        public string? ProfileImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }

        public string Password_Hashed { get; set; } = string.Empty;
        public string SaltKey { get; set; } = string.Empty;

        public UserRoleEnum Role { get; set; } = UserRoleEnum.Customer;
        public bool IsActivated { get; set; } = false;
        public ICollection<Quotation>? Quotation { get; set; } 
        public ICollection<Booking>? Bookings { get; set; } 
        public ICollection<Review>? Reviews { get; set; }
        public ICollection<Customer>? Customers { get; set; }
    }

}
