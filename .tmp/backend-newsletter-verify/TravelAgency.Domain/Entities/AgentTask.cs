using TravelAgency.Domain.Enums;

namespace TravelAgency.Domain.Entities
{
    public class AgentTask
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public TaskTypeEnum TaskType { get; set; }

        public AgentTaskStatusEnum Status { get; set; } = AgentTaskStatusEnum.Pending;

        public TaskPriorityEnum Priority { get; set; } = TaskPriorityEnum.Medium;

        public DateTime? DueDate { get; set; }

        // Notes written by the agent while working on the task
        public string? AgentNotes { get; set; }

        // The agent who must perform the task
        public int AssignedToAgentId { get; set; }
        public User? AssignedToAgent { get; set; }

        // The admin who created/assigned the task
        public int CreatedByAdminId { get; set; }
        public User? CreatedByAdmin { get; set; }

        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime? ClosedDate { get; set; }
    }
}
