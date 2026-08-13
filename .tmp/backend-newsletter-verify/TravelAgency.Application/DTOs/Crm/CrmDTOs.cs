using TravelAgency.Domain.Enums;

namespace TravelAgency.Application.DTOs.Crm
{
    public class CustomerDTO
    {
        public int Id { get; set; }
        public CustomerTypeEnum CustomerType { get; set; }
        public string CustomerTypeName => CustomerType.ToString();
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? CompanyName { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Mobile { get; set; } = string.Empty;
        public string? PreferredLanguage { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsActive { get; set; }
        public int? AgentId { get; set; }
        public string? AgentName { get; set; }
        public List<TravelerDTO> Travelers { get; set; } = new();
    }

    public class CreateCustomerDTO
    {
        public CustomerTypeEnum CustomerType { get; set; } = CustomerTypeEnum.Individual;
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? CompanyName { get; set; }
        public string PassportNumber { get; set; } = string.Empty;
        public DateOnly? DateOfBirth { get; set; }
        public GenderEnum Gender { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Mobile { get; set; } = string.Empty;
        public int? AgentId { get; set; }
        public List<CustomerTravelerInputDTO> Travelers { get; set; } = new();
    }

    public class UpdateCustomerDTO : CreateCustomerDTO
    {
        public int Id { get; set; }
    }

    public class CustomerTravelerInputDTO
    {
        public int? Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PassportNumber { get; set; } = string.Empty;
        public DateOnly? DateOfBirth { get; set; }
        public GenderEnum Gender { get; set; }
        public TravelerTypeEnum TravelerType { get; set; } = TravelerTypeEnum.Adult;
        public string Relationship { get; set; } = string.Empty;
    }

    public class TravelerDTO
    {
        public int Id { get; set; }
        public int? CustomerId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PassportNumber { get; set; } = string.Empty;
        public DateOnly? DateOfBirth { get; set; }
        public GenderEnum Gender { get; set; }
        public TravelerTypeEnum TravelerType { get; set; }
        public string Relationship { get; set; } = string.Empty;
        public bool IsPrimary { get; set; }
    }

    public class CreateTravelerDTO
    {
        public int CustomerId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PassportNumber { get; set; } = string.Empty;
        public DateOnly? DateOfBirth { get; set; }
        public GenderEnum Gender { get; set; }
        public TravelerTypeEnum TravelerType { get; set; } = TravelerTypeEnum.Adult;
        public string Relationship { get; set; } = string.Empty;
    }

    public class UpdateTravelerDTO : CreateTravelerDTO
    {
        public int Id { get; set; }
    }
}
