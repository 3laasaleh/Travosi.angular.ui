using TravelAgency.Domain.Enums;

namespace TravelAgency.Application.DTOs.Notifications
{
    public class NotificationDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public NotificationTypeEnum Type { get; set; }
        public string TypeName => Type.ToString();
        public bool IsRead { get; set; }
        public int? RelatedEntityId { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
