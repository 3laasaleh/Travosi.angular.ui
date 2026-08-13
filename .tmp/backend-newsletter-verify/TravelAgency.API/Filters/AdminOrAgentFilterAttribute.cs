using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Domain.Enums;

namespace TravelAgency.API.Filters
{
    /// <summary>
    /// Allows the action for authenticated users having the Admin or Agent role.
    /// </summary>
    public class AdminOrAgentFilterAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;

            if (user?.Identity is null || !user.Identity.IsAuthenticated)
            {
                context.Result = new UnauthorizedObjectResult(
                    GenericResponse<bool>.Unauthorized("Authentication is required."));
                return;
            }

            var isAllowed = user.IsInRole(UserRoleEnum.Admin.ToString())
                         || user.IsInRole(UserRoleEnum.Agent.ToString());

            if (!isAllowed)
            {
                context.Result = new ObjectResult(
                    GenericResponse<bool>.Unauthorized("Only agents or administrators can perform this action."))
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }
        }
    }



    

    public static class ClaimsPrincipalExtensions
    {
        public static int GetUserId(this ClaimsPrincipal principal)
        {
            var value = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.TryParse(value, out var id) ? id : 0;
        }
    }
}
