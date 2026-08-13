using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using TravelAgency.Domain.Enums;

namespace TravelAgency.Domain.Entities
{
    public class QuotationItem 
    {
        public int Id { get; set; }

        public int QuotationId { get; set; }

        public QuotationItemTypeEnum ItemType { get; set; }

  
      
        public string Description { get; set; } = null!;

        public int Quantity { get; set; }

        public decimal CostPrice { get; set; }

        public decimal SellingPrice { get; set; }

        public decimal Discount { get; set; }

        public decimal Total { get; set; }

        public int SortOrder { get; set; }





        public Quotation Quotation { get; set; } = null!;

        public int? PackageId { get; set; }
        public Package? Package { get; set; }
        public int? TourId { get; set; }
        public Tour? Tour { get; set; }
        public int? HotelId { get; set; }

        public Hotel? Hotel { get; set; }

        public int? FlightId { get; set; }

        public Flight? Flight { get; set; }



       
    }
}
