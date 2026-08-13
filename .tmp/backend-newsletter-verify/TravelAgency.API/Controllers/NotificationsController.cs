using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.Filters;
using TravelAgency.Application.DTOs.Notifications;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;

namespace TravelAgency.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class NotificationsController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationsController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        /// <summary>
        /// Notifications for the logged-in user (pass unreadOnly=true for the bell badge list).
        /// </summary>
        [HttpGet("Mine")]
        public async Task<GenericResponse<IList<NotificationDTO>>> GetMine([FromQuery] bool unreadOnly = false)
            => await _notificationService.GetMyAsync(User.GetUserId(), unreadOnly);

        [HttpGet("UnreadCount")]
        public async Task<GenericResponse<int>> UnreadCount()
            => await _notificationService.GetUnreadCountAsync(User.GetUserId());

        [HttpPatch("{id:int}/Read")]
        public async Task<GenericResponse<bool>> MarkAsRead(int id)
            => await _notificationService.MarkAsReadAsync(id, User.GetUserId());

        [HttpPatch("ReadAll")]
        public async Task<GenericResponse<bool>> MarkAllAsRead()
            => await _notificationService.MarkAllAsReadAsync(User.GetUserId());
    }
}
