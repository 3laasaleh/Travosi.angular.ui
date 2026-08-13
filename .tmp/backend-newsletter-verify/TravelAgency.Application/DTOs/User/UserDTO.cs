using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using TravelAgency.Domain.Enums;

namespace TravelAgency.Application.DTOs.User
{
    public class UserDTO
    {
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
    }
    public class UserLoginDTO
    {

        public int UserId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string UserName => string.Concat(FirstName, " ", LastName ) ;
        public string Email { get; set; } = string.Empty;
        public string Mobile { get; set; } = string.Empty;
        public string? ProfileImageUrl { get; set; }
        public string Token { get; set; } = string.Empty;
        public UserRoleEnum Role { get; set; } 

    }

    /// <summary>
    /// Lightweight agent entry for assignment dropdowns.
    /// </summary>
    public class AgentListItemDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? ProfileImageUrl { get; set; }
    }
}
