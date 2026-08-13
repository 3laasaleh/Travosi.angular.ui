using TravelAgency.Domain.Enums;

namespace TravelAgency.Application.DTOs.CrmDocuments
{
    public class InvoiceDTO
    {
        public int Id { get; set; }
        public string InvoiceNo { get; set; } = string.Empty;
        public int CustomerId { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerNumber { get; set; } = string.Empty;
        public int CurrencyId { get; set; }
        public string CurrencySign { get; set; } = string.Empty;
        public DateOnly InvoiceDate { get; set; }
        public DateOnly DueDate { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Discount { get; set; }
        public decimal TaxRate { get; set; }
        public decimal Tax { get; set; }
        public decimal TotalAmount { get; set; }
        public string? Notes { get; set; }
        public List<InvoiceItemDTO> Items { get; set; } = new();
    }

    public class InvoiceItemDTO
    {
        public int Id { get; set; }
        public QuotationItemTypeEnum ItemType { get; set; }
        public string Description { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Discount { get; set; }
        public decimal Total { get; set; }
        public int SortOrder { get; set; }
        public int? PackageId { get; set; }
        public int? TourId { get; set; }
    }

    public class SaveInvoiceDTO
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int CurrencyId { get; set; }
        public DateOnly InvoiceDate { get; set; }
        public DateOnly DueDate { get; set; }
        public decimal Discount { get; set; }
        public decimal TaxRate { get; set; }
        public string? Notes { get; set; }
        public List<SaveInvoiceItemDTO> Items { get; set; } = new();
    }

    public class SaveInvoiceItemDTO
    {
        public QuotationItemTypeEnum ItemType { get; set; }
        public string Description { get; set; } = string.Empty;
        public int Quantity { get; set; } = 1;
        public decimal UnitPrice { get; set; }
        public decimal Discount { get; set; }
        public int SortOrder { get; set; }
        public int? PackageId { get; set; }
        public int? TourId { get; set; }
    }

    public class VoucherDTO
    {
        public int Id { get; set; }
        public string VoucherNo { get; set; } = string.Empty;
        public int CustomerId { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerNumber { get; set; } = string.Empty;
        public VoucherServiceTypeEnum ServiceType { get; set; }
        public string ServiceTypeName => ServiceType.ToString();
        public string ServiceName { get; set; } = string.Empty;
        public DateOnly ServiceDate { get; set; }
        public DateOnly? EndDate { get; set; }
        public int? FlightId { get; set; }
        public int? HotelId { get; set; }
        public int? TourId { get; set; }
        public int? PackageId { get; set; }
    }

    public class SaveVoucherDTO
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public VoucherServiceTypeEnum ServiceType { get; set; }
        public DateOnly ServiceDate { get; set; }
        public DateOnly? EndDate { get; set; }
        public int? FlightId { get; set; }
        public int? HotelId { get; set; }
        public int? TourId { get; set; }
        public int? PackageId { get; set; }
    }
}
