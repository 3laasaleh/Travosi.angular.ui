using TravelAgency.Application.DTOs.Currency;
using TravelAgency.Application.DTOs.User;

namespace TravelAgency.Application.Interfaces
{
    public interface ICurrencyExchangeService
    {
        Task<GenericResponse<CurrencyRateDTO>> GetExchangeRateAsync(
            string fromCurrency,
            string toCurrency,
            CancellationToken cancellationToken = default);
    }
}
