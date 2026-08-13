using System;

using TravelAgency.Domain.Enums;

namespace TravelAgency.Domain.Entities
{
    public class Booking
    {
        public int Id { get; set; }
        public int NumberOfTravelers { get; set; }
        public decimal TotalPrice { get; set; }
        public BookingStatusEnum Status { get; set; } = BookingStatusEnum.Pending;
        public string? SpecialRequests { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
        public int? TourId { get; set; }
        public Tour? Tour { get; set; } 

        public int? PackageId { get; set; }
        public Package? Package { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedDate { get; set; }
        public int? AgentId { get; set; }
        public User? Agent { get; set; }
        public decimal CancellationFeeAmount { get; set; }
        public string? StatusNote { get; set; }
        public DateTime? CustomerContactedAt { get; set; }
        public DateTime? ConfirmedDate { get; set; }
        public DateTime? CancelledDate { get; set; }
    }
}
