using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using TravelAgency.Application.DTOs.Transport;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;

namespace TravelAgency.InfraStructure.GoogleMaps
{
    public sealed class GoogleAirportSearchService : IAirportSearchService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private readonly ILogger<GoogleAirportSearchService> _logger;

        public GoogleAirportSearchService(
            HttpClient httpClient,
            IConfiguration configuration,
            ILogger<GoogleAirportSearchService> logger)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<GenericResponse<IList<AirportSearchDTO>>> SearchAsync(
            string query,
            string languageCode,
            string? sessionToken,
            CancellationToken cancellationToken = default)
        {
            try
            {
                query = query.Trim();
                if (query.Length < 2)
                    return GenericResponse<IList<AirportSearchDTO>>.BadRequest(
                        "Enter at least two characters to search airports.");

                var apiKey = _configuration["GoogleMaps:PlacesApiKey"];
                if (string.IsNullOrWhiteSpace(apiKey))
                    return GenericResponse<IList<AirportSearchDTO>>.Failure(
                        "Google airport search is not configured. Add GoogleMaps:PlacesApiKey to the backend configuration.");

                var requestBody = new Dictionary<string, object?>
                {
                ["input"] = query,
                ["includedPrimaryTypes"] = new[] { "airport" },
                ["languageCode"] = NormalizeLanguage(languageCode),
                ["includeQueryPredictions"] = false,
                };
                if (!string.IsNullOrWhiteSpace(sessionToken))
                    requestBody["sessionToken"] = sessionToken.Trim();

                using var request = new HttpRequestMessage(HttpMethod.Post, "v1/places:autocomplete")
                {
                    Content = JsonContent.Create(requestBody),
                };
                request.Headers.Add("X-Goog-Api-Key", apiKey);
                request.Headers.Add(
                    "X-Goog-FieldMask",
                    "suggestions.placePrediction.placeId,suggestions.placePrediction.text,suggestions.placePrediction.structuredFormat");

                using var response = await _httpClient.SendAsync(request, cancellationToken);
                var json = await response.Content.ReadAsStringAsync(cancellationToken);
                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogWarning(
                        "Google Places airport autocomplete returned {StatusCode}: {Response}",
                        (int)response.StatusCode,
                        json);
                    return GenericResponse<IList<AirportSearchDTO>>.Failure(
                        "Airport search is temporarily unavailable.");
                }

                using var document = JsonDocument.Parse(json);
                var results = new List<AirportSearchDTO>();
                if (!document.RootElement.TryGetProperty("suggestions", out var suggestions))
                    return GenericResponse<IList<AirportSearchDTO>>.Success(results);

                foreach (var suggestion in suggestions.EnumerateArray())
                {
                    if (!suggestion.TryGetProperty("placePrediction", out var prediction))
                        continue;

                    var placeId = ReadString(prediction, "placeId");
                    var description = ReadNestedString(prediction, "text", "text");
                    var name = ReadNestedString(prediction, "structuredFormat", "mainText", "text");
                    if (string.IsNullOrWhiteSpace(description))
                        continue;

                    results.Add(new AirportSearchDTO
                    {
                        PlaceId = placeId,
                        Name = string.IsNullOrWhiteSpace(name) ? description : name,
                        Description = description,
                    });
                }

                return GenericResponse<IList<AirportSearchDTO>>.Success(results);
            }
            catch (OperationCanceledException exception) when (!cancellationToken.IsCancellationRequested)
            {
                _logger.LogError(exception, "Google Places airport autocomplete timed out.");
                return GenericResponse<IList<AirportSearchDTO>>.Failure(
                    "Airport search timed out. Please try again.");
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Google Places airport autocomplete failed.");
                return GenericResponse<IList<AirportSearchDTO>>.Failure(
                    "Airport search is temporarily unavailable.");
            }
        }

        private static string NormalizeLanguage(string value) =>
            value.Trim().StartsWith("ar", StringComparison.OrdinalIgnoreCase) ? "ar" : "en";

        private static string ReadString(JsonElement element, string propertyName) =>
            element.TryGetProperty(propertyName, out var value) ? value.GetString() ?? string.Empty : string.Empty;

        private static string ReadNestedString(JsonElement element, params string[] path)
        {
            var current = element;
            foreach (var propertyName in path)
            {
                if (!current.TryGetProperty(propertyName, out current))
                    return string.Empty;
            }

            return current.ValueKind == JsonValueKind.String ? current.GetString() ?? string.Empty : string.Empty;
        }
    }
}
