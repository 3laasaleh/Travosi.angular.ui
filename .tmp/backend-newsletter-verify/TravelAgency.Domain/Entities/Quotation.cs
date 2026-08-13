using System;
using System.Collections.Generic;
using System.Text;
using TravelAgency.Domain.Enums;

namespace TravelAgency.Domain.Entities
{
    public class Quotation
    {
        public int Id { get; set; }
        public string QuotationNo { get; set; } = null!;
        public int CustomerId { get; set; }
        public Customer Customer { get; set; } = null!;
        public int SalesAgentId { get; set; }
        public User? SalesAgent { get; set; }
        public int CurrencyId { get; set; }
        public Currency Currency { get; set; } = null!;
        public DateOnly TravelStartDate { get; set; }
        public DateOnly TravelEndDate { get; set; }
        public int Adults { get; set; }
        public int Children { get; set; }
        public int Infants { get; set; }
        public decimal ExchangeRate { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Discount { get; set; }
        /// <summary>Tax/VAT percentage applied to the discounted subtotal.</summary>
        public decimal TaxRate { get; set; }
        /// <summary>Tax amount calculated from <see cref="TaxRate"/>.</summary>
        public decimal Tax { get; set; }
        public decimal TotalAmount { get; set; }
        /// <summary>Sum of the item cost prices, used for margin reporting.</summary>
        public decimal TotalCost { get; set; }
        public QuotationStatusEnum Status { get; set; }
        public DateOnly ValidUntil { get; set; }
        public string? Notes { get; set; }
        public ICollection<QuotationItem> Items { get; set; } = new List<QuotationItem>();

        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }

    }
}
