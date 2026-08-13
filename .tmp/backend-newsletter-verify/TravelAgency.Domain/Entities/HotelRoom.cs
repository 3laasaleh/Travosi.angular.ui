using System;
using System.Collections.Generic;
using System.Text;
using TravelAgency.Domain.Enums;

namespace TravelAgency.Domain.Entities
{
    public class HotelRoom 
    {
        public int Id { get; set; }

        public int HotelId { get; set; }

        public string Name { get; set; } = null!;

        public RoomTypeEnum RoomType { get; set; }

        public MealPlanEnum MealPlan { get; set; }

        public int MaxAdults { get; set; }

        public int MaxChildren { get; set; }

        public decimal CostPrice { get; set; }

        public decimal SellingPrice { get; set; }

        public bool IsActive { get; set; }

        // Navigation
        public Hotel Hotel { get; set; } = null!;
    }
}
