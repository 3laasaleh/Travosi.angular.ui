using System;
using System.Collections.Generic;
using System.Text;
using TravelAgency.Application.DTOs;
using TravelAgency.Application.DTOs.User;

namespace TravelAgency.Application.Interfaces
{
    public interface IUserService
    {
        public Task<GenericResponse<UserLoginDTO>> LoginAsync(UserDTO User, CancellationToken cancellationToken);
        public Task<GenericResponse<UserLoginDTO>> FindByEmailAsync(string email, CancellationToken cancellationToken);
        public Task<GenericResponse<bool>> ActivateAccountAsync(ActivateAccountDto model, CancellationToken cancellationToken);
        public Task<GenericResponse<string>> UserRegisteration(UserRegisterationDTO User, CancellationToken cancellationToken);
        public Task<GenericResponse<string>> ForgetPasswordAsync(ForgotPasswordRequestDTO model, CancellationToken cancellationToken);
        public Task<GenericResponse<bool>> ChangePasswordAsync(CustomResetPasswordRequestDTO User, CancellationToken cancellationToken);
        public Task<GenericResponse<bool>> ChangePasswordProfileAsync(ChangePasswordRequestDTO resetPasswordRequest, CancellationToken cancellationToken);
        public Task<GenericResponse<IList<AgentListItemDTO>>> GetAgentsAsync(
            CancellationToken cancellationToken,
            int? maxResults = null);
        public Task<GenericResponse<string>> AddProfileImageAsync(
            int userId,
            Microsoft.AspNetCore.Http.IFormFile image,
            CancellationToken cancellationToken);
        public Task<GenericResponse<bool>> RemoveProfileImageAsync(
            int userId,
            CancellationToken cancellationToken);

    }
}
