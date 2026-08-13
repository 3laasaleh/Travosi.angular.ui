using Microsoft.EntityFrameworkCore;
using NLog;
using NLog.Web;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Options;
using System.Globalization;
using TravelAgency.API;
using TravelAgency.API.Middlewares;
using TravelAgency.Application;
using TravelAgency.Application.Common.Interfaces;
using TravelAgency.Application.Interfaces;
using TravelAgency.Application.Mapping;
using TravelAgency.Application.Services;
using TravelAgency.InfraStructure;
using TravelAgency.InfraStructure.ExchangeRates;
using TravelAgency.InfraStructure.GoogleMaps;
using TravelAgency.API.BackgroundServices;
using System.Threading.RateLimiting;


var logger = LogManager.Setup()
                       .LoadConfigurationFromFile("nlog.config")
                       .GetCurrentClassLogger();

try
{
    QuestPDF.Settings.License = QuestPDF.Infrastructure.LicenseType.Community;

    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.
    builder.Logging.ClearProviders();

    // Register NLog
    builder.Host.UseNLog();

    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "";



    builder.Services.AddControllers();
    builder.Services.AddRateLimiter(options =>
    {
        options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
        options.AddPolicy("newsletter-subscribe", context =>
            RateLimitPartition.GetFixedWindowLimiter(
                context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
                _ => new FixedWindowRateLimiterOptions
                {
                    PermitLimit = 5,
                    Window = TimeSpan.FromMinutes(10),
                    QueueLimit = 0,
                    AutoReplenishment = true
                }));
    });
    builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");
    builder.Services.Configure<RequestLocalizationOptions>(options =>
    {
        var supportedCultures = new[]
        {
            new CultureInfo("en"),
            new CultureInfo("ar")
        };

        options.DefaultRequestCulture = new RequestCulture("en");
        options.SupportedCultures = supportedCultures;
        options.SupportedUICultures = supportedCultures;
        options.RequestCultureProviders =
        [
            new AcceptLanguageHeaderRequestCultureProvider(),
            new CookieRequestCultureProvider()
        ];
    });
    // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
    builder.Services.AddOpenApi();


    builder.Services.AddSqlContext(connectionString);
  
    builder.Services.AddCors(s => {

        s.AddPolicy("SeeWorldWebUi", p =>
        {
            p.SetIsOriginAllowed(origin =>
                Uri.TryCreate(origin, UriKind.Absolute, out var uri) &&
                (uri.IsLoopback ||
                 uri.Host.Equals("seeworld.premiumasp.net", StringComparison.OrdinalIgnoreCase) ||
                 uri.Host.Equals("seaworldholidays.com", StringComparison.OrdinalIgnoreCase) ||
                 uri.Host.EndsWith(".seaworldholidays.com", StringComparison.OrdinalIgnoreCase)))
             .AllowAnyHeader()
             .AllowAnyMethod()
             .AllowCredentials();
        });
    });

   builder.Services.AddAutoMapper(s => {
        s.AddProfile(typeof(MappingProfile));
    });
    builder.Services.AddInfrastructureServices();
    builder.Services.AddRepositories();
    builder.Services.AddApplicationServices();
    builder.Services.AddHostedService<NewsletterWelcomeEmailRetryWorker>();
    builder.Services.AddHttpClient<ICurrencyExchangeService, CbeCurrencyExchangeService>(client =>
    {
        client.BaseAddress = new Uri("https://api.frankfurter.dev/v2/");
        client.Timeout = TimeSpan.FromSeconds(10);
    });
    builder.Services.AddHttpClient<IAirportSearchService, GoogleAirportSearchService>(client =>
    {
        client.BaseAddress = new Uri("https://places.googleapis.com/");
        client.Timeout = TimeSpan.FromSeconds(8);
    });

    builder.Services.AddScoped<IUserService, UserService>();
    builder.Services.AddJWTConfiguration(builder.Configuration);

    builder.Services.AddSwaggerConfiguration();

    var app = builder.Build();

    app.UseHttpsRedirection();
    app.UseDefaultFiles();
    app.UseStaticFiles();

    // Static assets are handled above and do not generate request/response log entries.
    //app.UseMiddleware<RequestLoggingMiddleware>();
    //app.UseMiddleware<ResponseLoggingMiddleware>();
    app.UseMiddleware<ExceptionMiddleware>();

    app.UseCors("SeeWorldWebUi");
    app.UseRequestLocalization(
        app.Services.GetRequiredService<IOptions<RequestLocalizationOptions>>().Value);
    app.UseRateLimiter();

    if (app.Environment.IsDevelopment())
    {
        app.MapOpenApi();
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.Use(async (context, next) =>
    {
        await next();

        if (context.Response.StatusCode == 404 &&
            !Path.HasExtension(context.Request.Path) &&
            !context.Request.Path.StartsWithSegments("/api"))
        {
            context.Response.StatusCode = 200;
            context.Request.Path = "/index.html";
            await next();
        }
    });

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();
    app.MapFallbackToFile("index.html");

    app.Run();
}
catch (Exception ex)
{
    logger.Error(ex, "Application stopped because of an exception.");
    throw;
}
finally
{
    LogManager.Shutdown();
}
