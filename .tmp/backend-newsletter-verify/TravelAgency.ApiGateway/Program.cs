var builder = WebApplication.CreateBuilder(args);

builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("SeeWorldWebUi", policy =>
        policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
});

builder.Services.AddHealthChecks();

var app = builder.Build();

app.UseCors("SeeWorldWebUi");

app.MapHealthChecks("/health");
app.MapGet("/", () => Results.Ok(new { gateway = "TravelAgency.ApiGateway", status = "up" }));

app.MapReverseProxy();

app.Run();
