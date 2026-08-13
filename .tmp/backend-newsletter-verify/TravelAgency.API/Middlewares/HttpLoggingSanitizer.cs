using System.Text.Json;
using System.Text.Json.Nodes;

namespace TravelAgency.API.Middlewares
{
    internal static class HttpLoggingSanitizer
    {
        private const string RedactedValue = "[REDACTED]";
        private static readonly string[] SensitiveNames =
        {
            "password", "token", "secret", "authorization", "cookie",
            "salt", "cardnumber", "cvv", "passportnumber"
        };

        public static string SanitizeBody(string body, string? contentType, bool truncated)
        {
            if (string.IsNullOrWhiteSpace(body))
                return "[empty]";

            string sanitized;
            if (contentType?.Contains("json", StringComparison.OrdinalIgnoreCase) == true)
            {
                sanitized = SanitizeJson(body);
            }
            else if (contentType?.Contains(
                         "application/x-www-form-urlencoded",
                         StringComparison.OrdinalIgnoreCase) == true)
            {
                sanitized = SanitizeForm(body);
            }
            else
            {
                sanitized = "[body omitted for non-JSON content]";
            }

            return truncated ? $"{sanitized} [TRUNCATED]" : sanitized;
        }

        public static string SanitizeQuery(IQueryCollection query)
        {
            if (query.Count == 0)
                return string.Empty;

            return QueryString.Create(query.SelectMany(pair =>
                pair.Value.Select(value => new KeyValuePair<string, string?>(
                    pair.Key,
                    IsSensitive(pair.Key) ? RedactedValue : value)))).Value ?? string.Empty;
        }

        private static string SanitizeJson(string body)
        {
            try
            {
                var node = JsonNode.Parse(body);
                RedactNode(node);
                return node?.ToJsonString(new JsonSerializerOptions
                {
                    WriteIndented = false
                }) ?? "null";
            }
            catch (JsonException)
            {
                return "[invalid or truncated JSON body]";
            }
        }

        private static string SanitizeForm(string body)
        {
            return string.Join("&", body.Split('&', StringSplitOptions.RemoveEmptyEntries)
                .Select(part =>
                {
                    var separatorIndex = part.IndexOf('=');
                    var encodedKey = separatorIndex >= 0 ? part[..separatorIndex] : part;
                    var key = Uri.UnescapeDataString(encodedKey.Replace('+', ' '));
                    return IsSensitive(key)
                        ? $"{encodedKey}={Uri.EscapeDataString(RedactedValue)}"
                        : part;
                }));
        }

        private static void RedactNode(JsonNode? node)
        {
            if (node is JsonObject jsonObject)
            {
                foreach (var property in jsonObject.ToList())
                {
                    if (IsSensitive(property.Key))
                        jsonObject[property.Key] = RedactedValue;
                    else
                        RedactNode(property.Value);
                }
            }
            else if (node is JsonArray jsonArray)
            {
                foreach (var item in jsonArray)
                    RedactNode(item);
            }
        }

        private static bool IsSensitive(string name)
            => SensitiveNames.Any(sensitiveName =>
                name.Contains(sensitiveName, StringComparison.OrdinalIgnoreCase));
    }
}
