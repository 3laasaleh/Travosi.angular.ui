using Microsoft.AspNetCore.Mvc;
using TravelAgency.Application.DTOs.AboutUs;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;

namespace TravelAgency.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AboutUsController : ControllerBase
    {
        private const int MaximumDisplayedAgents = 10;
        private readonly IUserService _userService;
        private readonly IAboutUsService _aboutUsService;

        public AboutUsController(IUserService userService, IAboutUsService aboutUsService)
        {
            _userService = userService;
            _aboutUsService = aboutUsService;
        }

        /// <summary>
        /// Returns up to ten agents for display on the public About Us page.
        /// </summary>
        [HttpGet("Agents")]
        public async Task<GenericResponse<IList<AgentListItemDTO>>> GetAgents()
            => await _userService.GetAgentsAsync(
                default,
                MaximumDisplayedAgents);

        /// <summary>
        /// Returns the total traveler and package counts displayed on the public About Us page.
        /// </summary>
        [HttpGet("Statistics")]
        public async Task<GenericResponse<AboutUsStatisticsDTO>> GetStatistics()
            => await _aboutUsService.GetStatisticsAsync();

        /// <summary>
        /// Registers or updates one anonymous browser visitor and returns the unique visitor total.
        /// </summary>
        [HttpPost("Visitors")]
        public async Task<GenericResponse<int>> RegisterVisitor(
            [FromBody] RegisterWebsiteVisitorDTO request)
            => await _aboutUsService.RegisterVisitorAsync(request.VisitorId);
    }
}
