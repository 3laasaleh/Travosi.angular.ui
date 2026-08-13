using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Domain.Enums;

namespace TravelAgency.API.Filters
{
    /// <summary>
    /// Allows the action only for authenticated users having the Admin role.
    /// </summary>
    public class AdminOnlyFilterAttribute : Attribute, IAuthorizationFilter
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

            if (!user.IsInRole(UserRoleEnum.Admin.ToString()))
            {
                context.Result = new ObjectResult(
                    GenericResponse<bool>.Unauthorized("Only administrators can perform this action."))
                {
                    StatusCode = StatusCodes.Status403Forbidden
                };
            }
        }
    }
}
