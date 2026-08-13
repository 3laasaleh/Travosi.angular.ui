using TravelAgency.Application.DTOs.Tours;

namespace TravelAgency.Application.DTOs.Geography
{
    public class CityDTO
    {
        public int Id { get; set; }
        public string? NameEng { get; set; }
        public string? NameAr { get; set; }
        public int? DestinationId { get; set; }
        public string? DestinationNameEng { get; set; }
        public string? DestinationNameAr { get; set; }
        public bool IsActive { get; set; }
    }

    public class CityDetailsDTO : CityDTO
    {
        public List<TourHomeDTO> TopTours { get; set; } = new();
    }

    public class CreateCityDTO
    {
        public string? NameEng { get; set; }
        public string? NameAr { get; set; }
        public int? DestinationId { get; set; }
    }

    public class UpdateCityDTO : CreateCityDTO
    {
        public int Id { get; set; }
    }
}
