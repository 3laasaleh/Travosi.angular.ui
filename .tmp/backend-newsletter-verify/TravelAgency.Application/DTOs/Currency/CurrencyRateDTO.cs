namespace TravelAgency.Application.DTOs.Currency
{
    public sealed class CurrencyRateDTO
    {
        public string FromCurrency { get; init; } = string.Empty;
        public string ToCurrency { get; init; } = string.Empty;
        public decimal Rate { get; init; }
        public string RateDate { get; init; } = string.Empty;
        public string Provider { get; init; } = string.Empty;
        public bool IsStale { get; init; }
    }
}
