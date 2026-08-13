using System.Diagnostics;
using System.Text;

namespace TravelAgency.API.Middlewares
{
    public class ResponseLoggingMiddleware
    {
        private const int MaximumBodyLength = 16 * 1024;
        private readonly RequestDelegate _next;
        private readonly ILogger<ResponseLoggingMiddleware> _logger;

        public ResponseLoggingMiddleware(
            RequestDelegate next,
            ILogger<ResponseLoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var originalBody = context.Response.Body;
            await using var captureStream = new ResponseCaptureStream(
                originalBody,
                MaximumBodyLength);
            context.Response.Body = captureStream;
            var stopwatch = Stopwatch.StartNew();

            try
            {
                await _next(context);
            }
            finally
            {
                stopwatch.Stop();
                context.Response.Body = originalBody;

                var body = HttpLoggingSanitizer.SanitizeBody(
                    captureStream.GetCapturedText(),
                    context.Response.ContentType,
                    captureStream.IsTruncated);
                var correlationId = context.Items[RequestLoggingMiddleware.CorrelationIdKey]
                    ?.ToString() ?? context.TraceIdentifier;

                var message =
                    "HTTP response {Method} {Path} returned {StatusCode} in {ElapsedMilliseconds} ms; CorrelationId={CorrelationId}; ContentType={ContentType}; ContentLength={ContentLength}; Body={Body}";
                var arguments = new object?[]
                {
                    context.Request.Method,
                    context.Request.Path.Value,
                    context.Response.StatusCode,
                    stopwatch.ElapsedMilliseconds,
                    correlationId,
                    context.Response.ContentType ?? "none",
                    context.Response.ContentLength ?? captureStream.TotalBytesWritten,
                    body
                };

                if (context.Response.StatusCode >= StatusCodes.Status500InternalServerError)
                    _logger.LogError(message, arguments);
                else if (context.Response.StatusCode >= StatusCodes.Status400BadRequest)
                    _logger.LogWarning(message, arguments);
                else
                    _logger.LogInformation(message, arguments);
            }
        }

        private sealed class ResponseCaptureStream : Stream
        {
            private readonly Stream _inner;
            private readonly MemoryStream _capture;
            private readonly int _maximumCaptureLength;

            public ResponseCaptureStream(Stream inner, int maximumCaptureLength)
            {
                _inner = inner;
                _maximumCaptureLength = maximumCaptureLength;
                _capture = new MemoryStream(maximumCaptureLength);
            }

            public long TotalBytesWritten { get; private set; }
            public bool IsTruncated => TotalBytesWritten > _capture.Length;
            public override bool CanRead => false;
            public override bool CanSeek => false;
            public override bool CanWrite => _inner.CanWrite;
            public override long Length => _inner.Length;

            public override long Position
            {
                get => _inner.Position;
                set => throw new NotSupportedException();
            }

            public string GetCapturedText()
                => Encoding.UTF8.GetString(_capture.ToArray());

            public override void Flush() => _inner.Flush();

            public override Task FlushAsync(CancellationToken cancellationToken)
                => _inner.FlushAsync(cancellationToken);

            public override int Read(byte[] buffer, int offset, int count)
                => throw new NotSupportedException();
            public override long Seek(long offset, SeekOrigin origin)
                => throw new NotSupportedException();
            public override void SetLength(long value)
                => throw new NotSupportedException();

            public override void Write(byte[] buffer, int offset, int count)
            {
                _inner.Write(buffer, offset, count);
                Capture(buffer.AsSpan(offset, count));
            }

            public override async Task WriteAsync(
                byte[] buffer,
                int offset,
                int count,
                CancellationToken cancellationToken)
            {
                await _inner.WriteAsync(buffer, offset, count, cancellationToken);
                Capture(buffer.AsSpan(offset, count));
            }

            public override ValueTask WriteAsync(
                ReadOnlyMemory<byte> buffer,
                CancellationToken cancellationToken = default)
            {
                Capture(buffer.Span);
                return _inner.WriteAsync(buffer, cancellationToken);
            }

            private void Capture(ReadOnlySpan<byte> bytes)
            {
                TotalBytesWritten += bytes.Length;
                var remaining = _maximumCaptureLength - (int)_capture.Length;
                if (remaining > 0)
                    _capture.Write(bytes[..Math.Min(remaining, bytes.Length)]);
            }

            protected override void Dispose(bool disposing)
            {
                if (disposing)
                    _capture.Dispose();
                base.Dispose(disposing);
            }

            public override async ValueTask DisposeAsync()
            {
                await _capture.DisposeAsync();
                GC.SuppressFinalize(this);
            }
        }
    }
}
