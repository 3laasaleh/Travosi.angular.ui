using TravelAgency.Domain.Enums;

namespace TravelAgency.Domain.Entities
{
    public class Invoice
    {
        public int Id { get; set; }
        public string InvoiceNo { get; set; } = null!;
        public int CustomerId { get; set; }
        public Customer Customer { get; set; } = null!;
        public int SalesAgentId { get; set; }
        public User? SalesAgent { get; set; }
        public int CurrencyId { get; set; }
        public Currency Currency { get; set; } = null!;
        public DateOnly InvoiceDate { get; set; }
        public DateOnly DueDate { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Discount { get; set; }
        public decimal TaxRate { get; set; }
        public decimal Tax { get; set; }
        public decimal TotalAmount { get; set; }
        public string? Notes { get; set; }
        public ICollection<InvoiceItem> Items { get; set; } = new List<InvoiceItem>();
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }

    public class InvoiceItem
    {
        public int Id { get; set; }
        public int InvoiceId { get; set; }
        public Invoice Invoice { get; set; } = null!;
        public QuotationItemTypeEnum ItemType { get; set; }
        public string Description { get; set; } = null!;
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Discount { get; set; }
        public decimal Total { get; set; }
        public int SortOrder { get; set; }
        public int? PackageId { get; set; }
        public Package? Package { get; set; }
        public int? TourId { get; set; }
        public Tour? Tour { get; set; }
    }
}
