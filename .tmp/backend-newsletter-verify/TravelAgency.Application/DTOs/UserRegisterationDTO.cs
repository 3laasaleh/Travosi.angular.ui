using System;
using System.Collections.Generic;
using System.Text;
using TravelAgency.Domain.Enums;

namespace TravelAgency.Application.DTOs
{
    public class UserRegisterationDTO
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Email { get; set; }
        public string? Mobile { get; set; }
        public string? Password { get; set; }
        public string? ConfirmPassword { get; set; }
        public DateOnly? DateOfBirth { get; set; }
        public GenderEnum Gender { get; set; }
        public string? PassportNumber { get; set; }

    }




}
