using System.Net.Http.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Logging;
using TravelAgency.Application.DTOs.Currency;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;

namespace TravelAgency.InfraStructure.ExchangeRates
{
    public sealed class CbeCurrencyExchangeService : ICurrencyExchangeService
    {
        private static readonly SemaphoreSlim CacheLock = new(1, 1);
        private static readonly TimeSpan CacheDuration = TimeSpan.FromHours(6);
        private static CurrencyRateDTO? _cachedUsdToEgpRate;
        private static DateTimeOffset _cacheExpiresAt;

        private readonly HttpClient _httpClient;
        private readonly ILogger<CbeCurrencyExchangeService> _logger;

        public CbeCurrencyExchangeService(
            HttpClient httpClient,
            ILogger<CbeCurrencyExchangeService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;
        }

        public async Task<GenericResponse<CurrencyRateDTO>> GetExchangeRateAsync(
            string fromCurrency,
            string toCurrency,
            CancellationToken cancellationToken = default)
        {
            try
            {
                var from = NormalizeCode(fromCurrency);
                var to = NormalizeCode(toCurrency);
                if (!IsSupported(from) || !IsSupported(to))
                    return GenericResponse<CurrencyRateDTO>.BadRequest(
                        "Only USD and EGP currency conversion is supported.");

                if (from == to)
                {
                    return GenericResponse<CurrencyRateDTO>.Success(new CurrencyRateDTO
                    {
                        FromCurrency = from,
                        ToCurrency = to,
                        Rate = 1,
                        RateDate = DateTime.UtcNow.ToString("yyyy-MM-dd"),
                        Provider = "Identity"
                    });
                }

                var cached = _cachedUsdToEgpRate;
                if (cached != null && DateTimeOffset.UtcNow < _cacheExpiresAt)
                    return GenericResponse<CurrencyRateDTO>.Success(ToRequestedDirection(cached, from, to));

                await CacheLock.WaitAsync(cancellationToken);
                try
                {
                    cached = _cachedUsdToEgpRate;
                    if (cached != null && DateTimeOffset.UtcNow < _cacheExpiresAt)
                        return GenericResponse<CurrencyRateDTO>.Success(ToRequestedDirection(cached, from, to));

                    try
                    {
                    var providerRate = await _httpClient.GetFromJsonAsync<FrankfurterRateResponse>(
                        "rate/USD/EGP",
                        cancellationToken);

                    if (providerRate == null ||
                        !string.Equals(providerRate.Base, "USD", StringComparison.OrdinalIgnoreCase) ||
                        !string.Equals(providerRate.Quote, "EGP", StringComparison.OrdinalIgnoreCase) ||
                        providerRate.Rate <= 0)
                    {
                        throw new InvalidOperationException("The exchange-rate provider returned an invalid USD/EGP rate.");
                    }

                    cached = new CurrencyRateDTO
                    {
                        FromCurrency = "USD",
                        ToCurrency = "EGP",
                        Rate = providerRate.Rate,
                        RateDate = providerRate.Date,
                        Provider = "Frankfurter reference rate"
                    };
                    _cachedUsdToEgpRate = cached;
                    _cacheExpiresAt = DateTimeOffset.UtcNow.Add(CacheDuration);

                    return GenericResponse<CurrencyRateDTO>.Success(ToRequestedDirection(cached, from, to));
                    }
                    catch (Exception exception) when (!cancellationToken.IsCancellationRequested)
                    {
                    _logger.LogError(exception, "Unable to refresh the CBE USD/EGP exchange rate.");
                    if (cached != null)
                    {
                        var staleRate = ToRequestedDirection(cached, from, to, true);
                        return GenericResponse<CurrencyRateDTO>.Success(
                            staleRate,
                            "The latest cached exchange rate is being used.");
                    }

                    return GenericResponse<CurrencyRateDTO>.Failure(
                        "The USD/EGP exchange rate is temporarily unavailable.");
                    }
                }
                finally
                {
                    CacheLock.Release();
                }
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(CbeCurrencyExchangeService), nameof(GetExchangeRateAsync));
                throw;
            }
        }

        private static CurrencyRateDTO ToRequestedDirection(
            CurrencyRateDTO usdToEgp,
            string from,
            string to,
            bool isStale = false)
        {
            var reverse = from == "EGP" && to == "USD";
            return new CurrencyRateDTO
            {
                FromCurrency = from,
                ToCurrency = to,
                Rate = reverse ? decimal.Round(1m / usdToEgp.Rate, 8) : usdToEgp.Rate,
                RateDate = usdToEgp.RateDate,
                Provider = usdToEgp.Provider,
                IsStale = isStale
            };
        }

        private static string NormalizeCode(string value) =>
            (value ?? string.Empty).Trim().ToUpperInvariant();

        private static bool IsSupported(string currencyCode) =>
            currencyCode is "USD" or "EGP";

        private sealed class FrankfurterRateResponse
        {
            [JsonPropertyName("date")]
            public string Date { get; init; } = string.Empty;

            [JsonPropertyName("base")]
            public string Base { get; init; } = string.Empty;

            [JsonPropertyName("quote")]
            public string Quote { get; init; } = string.Empty;

            [JsonPropertyName("rate")]
            public decimal Rate { get; init; }
        }
    }
}
