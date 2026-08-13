using System.Net;
using TravelAgency.Application.Common.Logging;

namespace TravelAgency.API.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                var correlationId = context.Items[RequestLoggingMiddleware.CorrelationIdKey]
                    ?.ToString() ?? context.TraceIdentifier;

                if (!ExceptionLogState.IsLogged(ex))
                {
                    _logger.LogError(
                        ex,
                        "Unhandled exception while processing {Method} {Path}; CorrelationId={CorrelationId}",
                        context.Request.Method,
                        context.Request.Path.Value,
                        correlationId);
                }

                if (context.Response.HasStarted)
                    throw;

                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.Clear();
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = new
            {
                context.Response.StatusCode,
                Message = "Something went wrong.",
                Detailed = "Contact support for help.",
                CorrelationId = context.Items[RequestLoggingMiddleware.CorrelationIdKey]
                    ?? context.TraceIdentifier

            };

            return context.Response.WriteAsJsonAsync(response);
        }
    }
}
