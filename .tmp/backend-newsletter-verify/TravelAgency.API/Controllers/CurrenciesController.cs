using Microsoft.AspNetCore.Mvc;
using TravelAgency.Application.DTOs.Currency;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Entities;

namespace TravelAgency.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrenciesController : ControllerBase
    {
        private readonly ICurrencyExchangeService _currencyExchangeService;
        private readonly ICurrencyService _currencyService;

        public CurrenciesController(
            ICurrencyExchangeService currencyExchangeService,
            ICurrencyService currencyService)
        {
            _currencyExchangeService = currencyExchangeService;
            _currencyService = currencyService;
        }

        /// <summary>Returns the currencies configured in the agency database for the website selector.</summary>
        [HttpGet]
        public Task<GenericResponse<IList<Currency>>> GetCurrencies()
            => _currencyService.GetAllAsync();

        [HttpGet("exchange-rate")]
        public Task<GenericResponse<CurrencyRateDTO>> GetExchangeRate(
            [FromQuery] string from = "USD",
            [FromQuery] string to = "EGP",
            CancellationToken cancellationToken = default)
            => _currencyExchangeService.GetExchangeRateAsync(from, to, cancellationToken);
    }
}
