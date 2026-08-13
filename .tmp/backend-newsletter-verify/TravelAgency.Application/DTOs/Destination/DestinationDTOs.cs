using Microsoft.AspNetCore.Http;

namespace TravelAgency.Application.DTOs.Destinations
{
    public class DestinationDTO
    {
        public int Id { get; set; }
        public string NameEng { get; set; } = string.Empty;
        public string NameAr { get; set; } = string.Empty;
        public string? SubDescription { get; set; }
        public string? Description { get; set; }
        public bool IsActive { get; set; }

        public List<ImageDTO> Images { get; set; } = new();
        public List<DestinationCityDTO> Cities { get; set; } = new();

    }

    public class CreateDestinationDTO
    {
        public string NameEng { get; set; } = string.Empty;
        public string NameAr { get; set; } = string.Empty;
        public string? SubDescription { get; set; }
        public string? Description { get; set; }
        public string? IsAvtive { get; set; }
        public List<IFormFile> Images { get; set; } = new();
    }

    public class UpdateDestinationDTO
    {
        public int Id { get; set; }
        public string NameEng { get; set; } = string.Empty;
        public string NameAr { get; set; } = string.Empty;
        public string? SubDescription { get; set; }
        public string? Description { get; set; }
        public bool IsAvtive { get; set; }
        public List<IFormFile> Images { get; set; } = new();


    }

    public class ChangeStatusDTO
    {
        public int Id { get; set; }
        public bool IsActive { get; set; }
    }

    public class DestinationCityDTO
    {
        public int Id { get; set; }
        public string? NameEng { get; set; }
        public string? NameAr { get; set; }
    }

    /// <summary>
    /// Compact, public hierarchy used by the website mega menu.
    /// </summary>
    public class DestinationNavigationDTO
    {
        public int Id { get; set; }
        public string NameEng { get; set; } = string.Empty;
        public string NameAr { get; set; } = string.Empty;
        public List<DestinationCityNavigationDTO> Cities { get; set; } = new();
    }

    public class DestinationCityNavigationDTO
    {
        public int Id { get; set; }
        public string NameEng { get; set; } = string.Empty;
        public string NameAr { get; set; } = string.Empty;
        public List<DestinationTourNavigationDTO> Tours { get; set; } = new();
    }

    public class DestinationTourNavigationDTO
    {
        public int Id { get; set; }
        public string TitleEng { get; set; } = string.Empty;
        public string TitleAr { get; set; } = string.Empty;
        public string? CoverImageUrl { get; set; }
        public decimal PricePerPerson { get; set; }
        public int CurrencyId { get; set; }
    }
}
