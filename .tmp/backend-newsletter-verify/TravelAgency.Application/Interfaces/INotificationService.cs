using TravelAgency.Application.DTOs.Notifications;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Enums;

namespace TravelAgency.Application.Interfaces
{
    public interface INotificationService
    {
        Task<GenericResponse<IList<NotificationDTO>>> GetMyAsync(int userId, bool unreadOnly);
        Task<GenericResponse<int>> GetUnreadCountAsync(int userId);
        Task<GenericResponse<bool>> MarkAsReadAsync(int id, int userId);
        Task<GenericResponse<bool>> MarkAllAsReadAsync(int userId);

        // Internal helper used by other services to raise a notification.
        Task CreateAsync(int userId, string title, string message, NotificationTypeEnum type, int? relatedEntityId = null);
    }
}
