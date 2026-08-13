using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using TravelAgency.Application.Common.Interfaces;
using TravelAgency.Application.Common.Logging;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Domain.Entities;

namespace TravelAgency.InfraStructure.Authentication
{
   public class JwtTokenGenerator : IJwtTokenGenerator
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<JwtTokenGenerator> _logger;

        public JwtTokenGenerator(IConfiguration configuration, ILogger<JwtTokenGenerator> logger)
        {
            _configuration = configuration;
            _logger = logger;

        }
        public string GenerateToken(UserLoginDTO othUser)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var secret = _configuration["JWT:Secret"] ?? "";
                var key = Encoding.ASCII.GetBytes(secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, othUser.UserName??""),
                        new(ClaimTypes.NameIdentifier, othUser.UserId.ToString()),
                        new Claim(ClaimTypes.Email, othUser?.Email??""),
                        new Claim(ClaimTypes.MobilePhone, othUser?.Mobile??""),
                        new Claim(ClaimTypes.Role, othUser?.Role.ToString() ?? ""),

                    }),
                    Audience = _configuration["JWT:Audience"],
                    Issuer = _configuration["JWT:Issuer"],
                    Expires = DateTime.UtcNow.AddMinutes(150),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),

                };
         

                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            catch (Exception e)
            {
                if (ExceptionLogState.TryMarkLogged(e))
                {
                    _logger.LogError(
                        e,
                        "Access-token generation failed for user {UserId}",
                        othUser.UserId);
                }
                throw;
            }

        }

        public string GenerateForgetPasswordToken(string username,string email)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var secret = _configuration["JWT:Secret"] ?? "";
                var key = Encoding.ASCII.GetBytes(secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        new Claim("userName", username),
                        new Claim(ClaimTypes.Email, email),

                    }),

                    Audience = _configuration["JWT:Audience"],
                    Issuer = _configuration["JWT:Issuer"],
                    Expires = DateTime.UtcNow.AddMinutes(30),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),

                };
               
                var token = tokenHandler.CreateToken(tokenDescriptor);

                return tokenHandler.WriteToken(token);
            }
            catch (Exception e)
            {
                if (ExceptionLogState.TryMarkLogged(e))
                {
                    _logger.LogError(
                        e,
                        "Password-reset token generation failed for {Email}",
                        email);
                }
                throw;
            }
        }

        public RefreshTokenDTO GenerateRefreshToken(string ipAddress)
        {
            return new RefreshTokenDTO
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
                Expires = DateTime.UtcNow.AddDays(7),
                Created = DateTime.UtcNow,
                CreatedByIp = ipAddress
            };
        }
    }
}
