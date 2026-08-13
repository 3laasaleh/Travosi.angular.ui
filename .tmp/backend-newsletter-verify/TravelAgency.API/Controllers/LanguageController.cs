using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using TravelAgency.API.Localization;
using TravelAgency.Application.DTOs.User;

namespace TravelAgency.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class LanguageController : ControllerBase
{
    private static readonly HashSet<string> SupportedLanguages =
        new(StringComparer.OrdinalIgnoreCase) { "en", "ar" };

    private readonly IStringLocalizer<SharedResource> _localizer;

    public LanguageController(IStringLocalizer<SharedResource> localizer)
    {
        _localizer = localizer;
    }

    [HttpPost("set")]
    [ProducesResponseType(typeof(GenericResponse<LanguageResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(GenericResponse<LanguageResponse>), StatusCodes.Status400BadRequest)]
    public ActionResult<GenericResponse<LanguageResponse>> Set([FromBody] SetLanguageRequest request)
    {
        var language = NormalizeLanguage(request.Language);
        if (language is null)
        {
            return BadRequest(GenericResponse<LanguageResponse>.BadRequest(
                _localizer["UnsupportedLanguage"]));
        }

        var culture = CultureInfo.GetCultureInfo(language);
        CultureInfo.CurrentCulture = culture;
        CultureInfo.CurrentUICulture = culture;

        Response.Cookies.Append(
            CookieRequestCultureProvider.DefaultCookieName,
            CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(culture)),
            new CookieOptions
            {
                Expires = DateTimeOffset.UtcNow.AddYears(1),
                HttpOnly = true,
                IsEssential = true,
                Path = "/",
                SameSite = SameSiteMode.None,
                Secure = true
            });

        return Ok(GenericResponse<LanguageResponse>.Success(
            new LanguageResponse(language, culture.DisplayName, culture.TextInfo.IsRightToLeft),
            _localizer["LanguageChanged"]));
    }

    [HttpGet("current")]
    [ProducesResponseType(typeof(GenericResponse<LanguageResponse>), StatusCodes.Status200OK)]
    public GenericResponse<LanguageResponse> Current()
    {
        var culture = CultureInfo.CurrentUICulture;
        var language = NormalizeLanguage(culture.Name) ?? "en";
        return GenericResponse<LanguageResponse>.Success(
            new LanguageResponse(language, culture.DisplayName, culture.TextInfo.IsRightToLeft),
            _localizer["CurrentLanguage"]);
    }

    private static string? NormalizeLanguage(string? language)
    {
        if (string.IsNullOrWhiteSpace(language)) return null;
        var normalized = language.Trim().Replace('_', '-').Split('-', 2)[0].ToLowerInvariant();
        return SupportedLanguages.Contains(normalized) ? normalized : null;
    }
}

public sealed record SetLanguageRequest(string? Language);
public sealed record LanguageResponse(string Language, string DisplayName, bool IsRightToLeft);
