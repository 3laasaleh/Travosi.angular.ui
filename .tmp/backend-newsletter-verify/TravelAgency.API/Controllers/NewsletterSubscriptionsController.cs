using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using TravelAgency.Application.DTOs.Newsletter;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;

namespace TravelAgency.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsletterSubscriptionsController : ControllerBase
    {
        private readonly INewsletterSubscriptionService _service;

        public NewsletterSubscriptionsController(INewsletterSubscriptionService service)
        {
            _service = service;
        }

        [HttpPost("Subscribe")]
        [EnableRateLimiting("newsletter-subscribe")]
        public async Task<ActionResult<GenericResponse<NewsletterSubscriptionResultDTO>>> Subscribe(
            [FromBody] SubscribeNewsletterDTO? model,
            CancellationToken cancellationToken)
        {
            if (model == null)
            {
                var badRequest = GenericResponse<NewsletterSubscriptionResultDTO>.BadRequest(
                    "Enter a valid email address.");
                return StatusCode(badRequest.StatusCode, badRequest);
            }

            var response = await _service.SubscribeAsync(model, cancellationToken);
            return StatusCode(response.StatusCode, response);
        }
    }
}
