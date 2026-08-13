
using System.ComponentModel.DataAnnotations;

namespace TravelAgency.Application.DTOs.User
{
    public class ChangePasswordRequestDTO
    {
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
        [Required]
        public string ConfirmPassword { get; set; } = string.Empty;
    }

    public class ForgotPasswordRequestDTO
    {
        [Required]
        public string Email { get; set; } = string.Empty;
    }
    public class CustomResetPasswordRequestDTO
    {
        [Required]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Token { get; set; } = string.Empty;
        [Required]
        public string NewPassword { get; set; } = string.Empty;
        [Required]
        public string ConfirmNewPassword { get; set; } = string.Empty;
    }
}
