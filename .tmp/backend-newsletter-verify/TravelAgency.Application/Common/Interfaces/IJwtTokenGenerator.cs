using System;
using System.Collections.Generic;
using System.Text;
using TravelAgency.Application.DTOs.User;

namespace TravelAgency.Application.Common.Interfaces
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(UserLoginDTO user);
        string GenerateForgetPasswordToken(string username, string email);

        public RefreshTokenDTO GenerateRefreshToken(string ipAddress);

    }
}
