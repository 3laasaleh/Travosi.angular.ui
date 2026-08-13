using System;
using System.Collections.Generic;
using System.Text;

namespace TravelAgency.Application.DTOs.User
{
    public class ActivateAccountDto
    {
        public string? Token { get; set; }
        public string? Email { get; set; }


    }
}
