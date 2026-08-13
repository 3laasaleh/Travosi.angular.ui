using Microsoft.AspNetCore.Http;

namespace TravelAgency.Application.DTOs.Packages
{
    public class PackageDTO
    {
        public int Id { get; set; }
        public string NameEng { get; set; } = string.Empty;
        public string NameAr { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int DurationDays { get; set; }
        public int DurationHours { get; set; }
        public decimal PricePerPerson { get; set; }
        public decimal PricePerChild { get; set; }
        public int CurrencyId { get; set; }
        public int MaxCapacity { get; set; }
        public int SeatsBooked { get; set; }
        public int SeatsAvailable { get; set; }
        public bool IsActive { get; set; }
        public string CancellationPolicy { get; set; } = string.Empty;
        public bool IsFreeCancelation { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public int BookingsCount { get; set; }
        public List<PackageDestinationDTO> Destinations { get; set; } = new();
        public List<ImageDTO> Images { get; set; } = new();
        public List<PackageItineraryDTO> Itinerary { get; set; } = new();
    }

    public class PackageDestinationDTO
    {
        public int DestinationId { get; set; }
        public string? DestinationName { get; set; }
        public int DisplayOrder { get; set; }
    }

    public class PackageItineraryDTO
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public bool IsChildNode { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int DayNumber { get; set; }
        public TimeOnly? StartTime { get; set; }
        public TimeOnly? EndTime { get; set; }
        public List<PackageItineraryDTO> Childs { get; set; } = new();
    }

    public class CreatePackageDestinationDTO
    {
        public int DestinationId { get; set; }
        public int DisplayOrder { get; set; }
    }

    public class CreatePackageItineraryDTO
    {
        public string Title { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int DayNumber { get; set; }
        public TimeOnly? StartTime { get; set; }
        public TimeOnly? EndTime { get; set; }
        public List<CreatePackageItineraryDTO> Childs { get; set; } = new();
    }

    public class CreatePackageDTO
    {
        public string NameEng { get; set; } = string.Empty;
        public string NameAr { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int DurationDays { get; set; }
        public int DurationHours { get; set; } = 0;
        public decimal PricePerPerson { get; set; }
        public decimal PricePerChild { get; set; }
        public int CurrencyId { get; set; } = 2;
        public int MaxCapacity { get; set; }
        public string CancellationPolicy { get; set; } = string.Empty;
        public bool IsFreeCancelation { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public List<CreatePackageDestinationDTO> Destinations { get; set; } = new();
        public List<ImageDTO> Images { get; set; } = new();
        public List<CreatePackageItineraryDTO> Itinerary { get; set; } = new();
    }

    public class UpdatePackageDTO : CreatePackageDTO
    {
        public int Id { get; set; }
    }

    public class AddPackageImageDTO
    {
        public int PackageId { get; set; }
        public List<IFormFile> Images { get; set; } = new();
    }

    public class AddPackageItineraryDTO
    {
        public int PackageId { get; set; }
        public List<CreatePackageItineraryDTO> Itinerary { get; set; } = new();
    }
}
