using TravelAgency.Domain.Enums;

namespace TravelAgency.Application.DTOs.Bookings
{
    public class BookingDTO
    {
        public int Id { get; set; }
        public int NumberOfTravelers { get; set; }
        public decimal TotalPrice { get; set; }
        public BookingStatusEnum Status { get; set; }
        public string StatusName => Status.ToString();
        public string? SpecialRequests { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public int UserId { get; set; }
        public string? UserName { get; set; }
        public string? UserMobile { get; set; }
        public int? TourId { get; set; }
        public string? TourTitle { get; set; }
        public int? PackageId { get; set; }
        public string? PackageName { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int? UpdatedByAdminId { get; set; }
        public int? AgentId { get; set; }
        public string? AgentName { get; set; }
        public decimal CancellationFeeAmount { get; set; }
        public string? StatusNote { get; set; }
        public DateTime? CustomerContactedAt { get; set; }
        public DateTime? ConfirmedDate { get; set; }
        public DateTime? CancelledDate { get; set; }
        public bool IsFreeCancellation { get; set; }
    }

    public class CreateBookingDTO
    {
        public int NumberOfTravelers { get; set; }
        public string? SpecialRequests { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public int? TourId { get; set; }
        public int? PackageId { get; set; }

        // Alternative payload shape used by the public tour booking card
        public DateTime? TravelDate { get; set; }
        public int? Adults { get; set; }
        public int? Children { get; set; }
        public string? Notes { get; set; }
    }

    public class UpdateBookingDTO
    {
        public int Id { get; set; }
        public int NumberOfTravelers { get; set; }
        public string? SpecialRequests { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
    }

    public class ChangeBookingStatusDTO
    {
        public int Id { get; set; }
        public BookingStatusEnum Status { get; set; }
        public decimal? CancellationFeeAmount { get; set; }
        public string? Note { get; set; }
        public bool CustomerContacted { get; set; }
    }

    /// <summary>
    /// Used by PATCH Booking/{id}/ChangeStatus where the id comes from the route.
    /// </summary>
    public class ChangeBookingStatusByIdDTO
    {
        public BookingStatusEnum Status { get; set; }
        public decimal? CancellationFeeAmount { get; set; }
        public string? Note { get; set; }
        public bool CustomerContacted { get; set; }
    }

    /// <summary>
    /// Used by PATCH Booking/{id}/AssignAgent to hand a booking (and its customer) to an agent.
    /// </summary>
    public class AssignAgentDTO
    {
        public int AgentId { get; set; }
    }
}
