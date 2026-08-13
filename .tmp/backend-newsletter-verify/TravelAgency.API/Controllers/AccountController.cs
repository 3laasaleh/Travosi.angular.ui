using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.Filters;
using TravelAgency.Application.Common.Interfaces;
using TravelAgency.Application.DTOs;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;

namespace TravelAgency.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly  IUserService _userService;
        private readonly  ILogger<AccountController> _logger;
        private readonly IJwtTokenGenerator _jwtService;

        public AccountController(IUserService userService,ILogger<AccountController> logger, IJwtTokenGenerator jwtService)
        {
            _userService= userService;
            _logger= logger;
            _jwtService= jwtService;


        }
        [HttpPost("Login")]
        public async Task<GenericResponse<UserLoginDTO>> Login(UserDTO model, CancellationToken cancellationToken)
        {
        
                var res = await _userService.LoginAsync(model, cancellationToken);
                return res;
       

        }
        /// <summary>
        /// Agents list for assignment dropdowns (admin only).
        /// </summary>
        [HttpGet("GetAgents")]
        [AdminOnlyFilter]
        public async Task<GenericResponse<IList<AgentListItemDTO>>> GetAgents(CancellationToken cancellationToken)
            => await _userService.GetAgentsAsync(cancellationToken);

        [HttpPost("Registeration")]
        public async Task<GenericResponse<string>> Registeration(UserRegisterationDTO model, CancellationToken cancellationToken)
        {
         
                return await _userService.UserRegisteration(model, cancellationToken);

        }
        [HttpPost("Activate")]
        [Authorize]
        public async Task<GenericResponse<bool>> ActivateAccount(ActivateAccountDto user, CancellationToken cancellationToken)
        {

                var res = await _userService.ActivateAccountAsync(user, cancellationToken);
                return res;


        }
        [HttpPost("forgetpassword")]
        public async Task<GenericResponse<bool>> ForgetPassword([FromBody] ForgotPasswordRequestDTO model, CancellationToken cancellationToken)
        {
             await _userService.ForgetPasswordAsync(model, cancellationToken);

            return GenericResponse<bool>.Success(true, "Reset password link has been sent to your email.");
        }


        [HttpPost("changepassword")]
        [Authorize]
        public async Task<GenericResponse<bool>> ChangePassword([FromBody] ChangePasswordRequestDTO model, CancellationToken cancellationToken)
        {
            var res = await _userService.ChangePasswordProfileAsync(model, cancellationToken);
            return res;
        }
    }
}
