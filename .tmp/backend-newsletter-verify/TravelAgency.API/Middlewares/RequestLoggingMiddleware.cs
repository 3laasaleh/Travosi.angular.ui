using System.Text;

namespace TravelAgency.API.Middlewares
{
    public class RequestLoggingMiddleware
    {
        public const string CorrelationIdKey = "X-Correlation-Id";
        private const int MaximumBodyLength = 16 * 1024;
        private readonly RequestDelegate _next;
        private readonly ILogger<RequestLoggingMiddleware> _logger;

        public RequestLoggingMiddleware(
            RequestDelegate next,
            ILogger<RequestLoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var correlationId = GetCorrelationId(context);
            context.Items[CorrelationIdKey] = correlationId;
            context.TraceIdentifier = correlationId;
            context.Response.Headers[CorrelationIdKey] = correlationId;

            var body = await ReadBodyAsync(context.Request);
            var query = HttpLoggingSanitizer.SanitizeQuery(context.Request.Query);

            using (_logger.BeginScope(new Dictionary<string, object>
                   {
                       ["CorrelationId"] = correlationId
                   }))
            {
                _logger.LogInformation(
                    "HTTP request {Method} {Path}{Query} from {RemoteIp}; ContentType={ContentType}; ContentLength={ContentLength}; Body={Body}",
                    context.Request.Method,
                    context.Request.Path.Value,
                    query,
                    context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
                    context.Request.ContentType ?? "none",
                    context.Request.ContentLength,
                    body);

                await _next(context);
            }
        }

        private static string GetCorrelationId(HttpContext context)
        {
            var suppliedId = context.Request.Headers[CorrelationIdKey].FirstOrDefault();
            return !string.IsNullOrWhiteSpace(suppliedId) && suppliedId.Length <= 128
                ? suppliedId
                : Guid.NewGuid().ToString("N");
        }

        private static async Task<string> ReadBodyAsync(HttpRequest request)
        {
            if (request.ContentLength is null or 0 || !IsTextContent(request.ContentType))
                return "[empty or non-text body]";

            request.EnableBuffering();
            var buffer = new char[MaximumBodyLength];

            try
            {
                using var reader = new StreamReader(
                    request.Body,
                    Encoding.UTF8,
                    detectEncodingFromByteOrderMarks: true,
                    leaveOpen: true);
                var charactersRead = await reader.ReadBlockAsync(buffer, 0, buffer.Length);
                var truncated = charactersRead == MaximumBodyLength;
                return HttpLoggingSanitizer.SanitizeBody(
                    new string(buffer, 0, charactersRead),
                    request.ContentType,
                    truncated);
            }
            finally
            {
                request.Body.Position = 0;
            }
        }

        private static bool IsTextContent(string? contentType)
            => contentType?.Contains("json", StringComparison.OrdinalIgnoreCase) == true
            || contentType?.Contains("xml", StringComparison.OrdinalIgnoreCase) == true
            || contentType?.StartsWith("text/", StringComparison.OrdinalIgnoreCase) == true
            || contentType?.Contains(
                "application/x-www-form-urlencoded",
                StringComparison.OrdinalIgnoreCase) == true;
    }
}
