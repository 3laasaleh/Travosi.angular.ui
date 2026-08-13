using TravelAgency.Application.DTOs.Crm;
using TravelAgency.Domain.Enums;

namespace TravelAgency.Application.DTOs.Quotations
{
    public class QuotationDTO
    {
        public int Id { get; set; }
        public string QuotationNo { get; set; } = string.Empty;
        public int CustomerId { get; set; }
        public string? CustomerName { get; set; }
        public string? CustomerEmail { get; set; }
        public string? CustomerMobile { get; set; }
        public string? CustomerTypeName { get; set; }
        public string? CompanyName { get; set; }
        public int SalesAgentId { get; set; }
        public string? SalesAgentName { get; set; }
        public int CurrencyId { get; set; }
        public string? CurrencySign { get; set; }
        public DateOnly TravelStartDate { get; set; }
        public DateOnly TravelEndDate { get; set; }
        public int Adults { get; set; }
        public int Children { get; set; }
        public int Infants { get; set; }
        public decimal ExchangeRate { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Discount { get; set; }
        public decimal TaxRate { get; set; }
        public decimal Tax { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal TotalCost { get; set; }

        /// <summary>Gross profit for the agency (total excluding tax, minus supplier cost).</summary>
        public decimal Margin => decimal.Round(SubTotal - Discount - TotalCost, 2);

        public decimal MarginPercentage =>
            (SubTotal - Discount) == 0 ? 0 : decimal.Round(Margin / (SubTotal - Discount) * 100, 2);

        /// <summary>Total converted to the agency base currency using the stored exchange rate.</summary>
        public decimal TotalAmountInBaseCurrency => decimal.Round(TotalAmount * ExchangeRate, 2);

        public QuotationStatusEnum Status { get; set; }
        public string StatusName => Status.ToString();
        public DateOnly ValidUntil { get; set; }
        public bool IsExpired => ValidUntil < DateOnly.FromDateTime(DateTime.UtcNow)
                                 && Status != QuotationStatusEnum.Accepted;
        public string? Notes { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public List<QuotationItemDTO> Items { get; set; } = new();
    }

    public class QuotationItemDTO
    {
        public int Id { get; set; }
        public QuotationItemTypeEnum ItemType { get; set; }
        public string ItemTypeName => ItemType.ToString();
        public string Description { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal CostPrice { get; set; }
        public decimal SellingPrice { get; set; }
        public decimal Discount { get; set; }
        public decimal Total { get; set; }
        public int SortOrder { get; set; }
        public int? PackageId { get; set; }
        public int? TourId { get; set; }
        public int? HotelId { get; set; }
        public int? FlightId { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime? ServiceStartDate { get; set; }
        public DateTime? ServiceEndDate { get; set; }
    }

    public class CreateQuotationDTO
    {
        public int CustomerId { get; set; }
        public int CurrencyId { get; set; }
        public DateOnly TravelStartDate { get; set; }
        public DateOnly TravelEndDate { get; set; }
        public int Adults { get; set; } = 1;
        public int Children { get; set; }
        public int Infants { get; set; }
        public decimal ExchangeRate { get; set; } = 1;
        public decimal Discount { get; set; }
        /// <summary>Tax/VAT percentage (e.g. 14 for 14%).</summary>
        public decimal TaxRate { get; set; }
        public DateOnly ValidUntil { get; set; }
        public string? Notes { get; set; }
        public List<CreateQuotationItemDTO> Items { get; set; } = new();
    }

    public class CreateQuotationItemDTO
    {
        public QuotationItemTypeEnum ItemType { get; set; }
        public string Description { get; set; } = string.Empty;
        public int Quantity { get; set; } = 1;
        public decimal CostPrice { get; set; }
        public decimal SellingPrice { get; set; }
        public decimal Discount { get; set; }
        public int SortOrder { get; set; }
        public int? PackageId { get; set; }
        public int? TourId { get; set; }
        public int? HotelId { get; set; }
        public int? FlightId { get; set; }
    }

    public class UpdateQuotationDTO : CreateQuotationDTO
    {
        public int Id { get; set; }
    }

    public class ChangeQuotationStatusDTO
    {
        public int Id { get; set; }
        public QuotationStatusEnum Status { get; set; }
    }

    public class QuotationSummaryDTO
    {
        public int Total { get; set; }
        public int Draft { get; set; }
        public int Sent { get; set; }
        public int Accepted { get; set; }
        public int Rejected { get; set; }
        public int Expired { get; set; }
        public int Cancelled { get; set; }
        public decimal AcceptedValue { get; set; }
        public decimal PipelineValue { get; set; }
        public decimal ConversionRate { get; set; }
    }
}
