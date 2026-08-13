using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.Filters;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;

namespace TravelAgency.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("ProfileImage")]
        public async Task<GenericResponse<string>> AddProfileImage(
            [FromForm] IFormFile image,
            CancellationToken cancellationToken)
            => await _userService.AddProfileImageAsync(User.GetUserId(), image, cancellationToken);

        [HttpDelete("ProfileImage")]
        public async Task<GenericResponse<bool>> RemoveProfileImage(CancellationToken cancellationToken)
            => await _userService.RemoveProfileImageAsync(User.GetUserId(), cancellationToken);
    }
}
