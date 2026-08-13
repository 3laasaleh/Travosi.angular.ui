using TravelAgency.Domain.Enums;

namespace TravelAgency.Domain.Entities
{
    public class Notification
    {
        public int Id { get; set; }

        // Recipient user (e.g. the agent who was assigned a task)
        public int UserId { get; set; }
        public User? User { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Message { get; set; } = string.Empty;

        public NotificationTypeEnum Type { get; set; } = NotificationTypeEnum.General;

        public bool IsRead { get; set; }

        // Optional reference to the related entity (e.g. AgentTask.Id)
        public int? RelatedEntityId { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
