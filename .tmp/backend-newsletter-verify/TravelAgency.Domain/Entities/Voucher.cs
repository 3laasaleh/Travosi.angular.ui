using TravelAgency.Domain.Enums;

namespace TravelAgency.Domain.Entities
{
    public class Voucher
    {
        public int Id { get; set; }
        public string VoucherNo { get; set; } = null!;
        public int CustomerId { get; set; }
        public Customer Customer { get; set; } = null!;
        public int SalesAgentId { get; set; }
        public User? SalesAgent { get; set; }
        public VoucherServiceTypeEnum ServiceType { get; set; }
        public string ServiceName { get; set; } = null!;
        public DateOnly ServiceDate { get; set; }
        public DateOnly? EndDate { get; set; }
        public int? FlightId { get; set; }
        public Flight? Flight { get; set; }
        public int? HotelId { get; set; }
        public Hotel? Hotel { get; set; }
        public int? TourId { get; set; }
        public Tour? Tour { get; set; }
        public int? PackageId { get; set; }
        public Package? Package { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
