using Microsoft.AspNetCore.Http;
using TravelAgency.Application.DTOs.Tour;
using TravelAgency.Domain.Entities;

namespace TravelAgency.Application.DTOs.Tours
{
    public class TourHomeDTO
    {
        public int Id { get; set; }
        public string? CoverImageUrl { get; set; }
        public string? TitleEng { get; set; } = string.Empty;
        public string? TitleAr { get; set; } = string.Empty;
        public string? DestinationName { get; set; }
        public int? CityId { get; set; }
        public string? CityName { get; set; }
        public string? Description { get; set; }
        public string? FullDescription { get; set; }
        public decimal PricePerPerson { get; set; }
        public decimal PricePerChild { get; set; }
        public int CurrencyId { get; set; }
    }
    public class TourDTO
    {
        public int Id { get; set; }
        public string? CoverImageUrl { get; set; }
        public string TitleEng { get; set; } = string.Empty;
        public string TitleAr { get; set; } = string.Empty;
        public int DestinationId { get; set; }
        public string? DestinationName { get; set; }
        public int? CityId { get; set; }
        public string? CityName { get; set; }
        public string? Description { get; set; }
        public string? FullDescription { get; set; }
        public decimal PricePerPerson { get; set; }
        public decimal PricePerChild { get; set; }
        public int CurrencyId { get; set; }
        public int DurationDays { get; set; }
        public int Durationhours { get; set; }
        public int SeatsBooked { get; set; }
        public int MaxSeats { get; set; }
        public int SeatsAvailable { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string CancellationPolicy { get; set; } = string.Empty;
        public bool IsFreeCancelation { get; set; }
        public bool IsActive { get; set; }
        public List<ImageDTO> Images { get; set; } = new();
        public List<TourItineraryDTO> Itinerary { get; set; } = new();
        public List<TourHighlightDTO> Highlights { get; set; } = new List<TourHighlightDTO>();
        public List<TourIncludeDTO> Includes { get; set; } = new List<TourIncludeDTO>();
        public List<TourExcludeDTO> Excludes { get; set; } = new List<TourExcludeDTO>();
    }

    public class TourItineraryDTO
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
        public List<TourItineraryDTO> Childs { get; set; } = new();
    }

    public class CreateTourItineraryDTO
    {
        public string Title { get; set; } = string.Empty;
        public string Value { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int DayNumber { get; set; }
        public TimeOnly? StartTime { get; set; }
        public TimeOnly? EndTime { get; set; }
        public List<CreateTourItineraryDTO> Childs { get; set; } = new();
    }

    public class CreateTourDTO
    {
        public string TitleEng { get; set; } = string.Empty;
        public string TitleAr { get; set; } = string.Empty;
        public int DestinationId { get; set; }
        public int? CityId { get; set; }
        public string? Description { get; set; }
        public string? FullDescription { get; set; }
        public decimal PricePerPerson { get; set; }
        public decimal PricePerChild { get; set; }
        //public int CurrencyId { get; set; } = 2;
        public int DurationDays { get; set; }
        public int Durationhours { get; set; }
        public int MaxSeats { get; set; } = 14;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string CancellationPolicy { get; set; } = string.Empty;
        public bool IsFreeCancelation { get; set; }
        public List<TourHighlightDTO> Highlights { get; set; } = new List<TourHighlightDTO>();
        public List<TourIncludeDTO> Includes { get; set; } = new List<TourIncludeDTO>();
        public List<TourExcludeDTO> Excludes { get; set; } = new List<TourExcludeDTO>();
    }
    public class AddTourImageDTO
    {
        public int TourId { get; set; }
        // Zero-based position in this upload batch. When omitted, an existing
        // cover is retained; a new tour falls back to the first uploaded image.
        public int? CoverImageIndex { get; set; }
        public List<IFormFile> Images { get; set; } = new();
    }

    public class SetTourCoverImageDTO
    {
        public int TourId { get; set; }
        public int ImageId { get; set; }
    }

    public class AddTourItenraryDTO
    {
        public int TourId { get; set; }
        public List<CreateTourItineraryDTO> Itinerary { get; set; } = new();
    }
    public class UpdateTourDTO : CreateTourDTO
    {
        public int Id { get; set; }
    }
}
