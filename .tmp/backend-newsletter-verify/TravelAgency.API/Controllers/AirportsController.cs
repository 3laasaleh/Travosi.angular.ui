using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.Filters;
using TravelAgency.Application.DTOs.Transport;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;

namespace TravelAgency.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirportsController : ControllerBase
    {
        private readonly IAirportSearchService _airportSearchService;

        public AirportsController(IAirportSearchService airportSearchService)
        {
            _airportSearchService = airportSearchService;
        }

        [HttpGet("search")]
        [AdminOrAgentFilter]
        public Task<GenericResponse<IList<AirportSearchDTO>>> Search(
            [FromQuery] string query,
            [FromQuery] string language = "en",
            [FromQuery] string? sessionToken = null,
            CancellationToken cancellationToken = default)
            => _airportSearchService.SearchAsync(query, language, sessionToken, cancellationToken);
    }
}
