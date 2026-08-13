
using TravelAgency.Domain.Enums;

namespace TravelAgency.Domain.Entities
{
    public class Payment
    {
        public int Id { get; set; }
        public int BookingId { get; set; }
        public Booking? Booking { get; set; } 
        public decimal Amount { get; set; }
        public int CurrencyId { get; set; }
        public Currency? Currency { get; set; }
        public PaymentStatusEnum Status { get; set; } = PaymentStatusEnum.Pending;
        public PaymentMethodEnum Method { get; set; }
        public DateTime PaymentDate { get; set; }
        public string? Provider { get; set; }
        public string? TransactionReference { get; set; }
    }
}
