using TravelAgency.Domain.Enums;

namespace TravelAgency.Application.DTOs.Hotels
{
    public class HotelDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int StarRating { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Website { get; set; }
        public bool IsActive { get; set; }
        public int DestinationId { get; set; }
        public string? DestinationName { get; set; }
        public List<HotelRoomDTO> Rooms { get; set; } = new();
    }

    public class CreateHotelDTO
    {
        public string Name { get; set; } = string.Empty;
        public int StarRating { get; set; }
        public string? Address { get; set; }
        public string? Description { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Website { get; set; }
        public int DestinationId { get; set; }
    }

    public class UpdateHotelDTO : CreateHotelDTO
    {
        public int Id { get; set; }
    }

    public class HotelRoomDTO
    {
        public int Id { get; set; }
        public int HotelId { get; set; }
        public string Name { get; set; } = string.Empty;
        public RoomTypeEnum RoomType { get; set; }
        public string RoomTypeName => RoomType.ToString();
        public MealPlanEnum MealPlan { get; set; }
        public string MealPlanName => MealPlan.ToString();
        public int MaxAdults { get; set; }
        public int MaxChildren { get; set; }
        public decimal CostPrice { get; set; }
        public decimal SellingPrice { get; set; }
        public bool IsActive { get; set; }
    }

    public class CreateHotelRoomDTO
    {
        public int HotelId { get; set; }
        public string Name { get; set; } = string.Empty;
        public RoomTypeEnum RoomType { get; set; }
        public MealPlanEnum MealPlan { get; set; }
        public int MaxAdults { get; set; }
        public int MaxChildren { get; set; }
        public decimal CostPrice { get; set; }
        public decimal SellingPrice { get; set; }
    }

    public class UpdateHotelRoomDTO : CreateHotelRoomDTO
    {
        public int Id { get; set; }
    }
}
