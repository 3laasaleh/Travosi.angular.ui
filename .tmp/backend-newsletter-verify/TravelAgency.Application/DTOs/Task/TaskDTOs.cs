using TravelAgency.Domain.Enums;

namespace TravelAgency.Application.DTOs.Tasks
{
    public class AgentTaskDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public TaskTypeEnum TaskType { get; set; }
        public string TaskTypeName => TaskType.ToString();
        public AgentTaskStatusEnum Status { get; set; }
        public string StatusName => Status.ToString();
        public TaskPriorityEnum Priority { get; set; }
        public string PriorityName => Priority.ToString();
        public DateTime? DueDate { get; set; }
        public string? AgentNotes { get; set; }
        public string? AgentDescription => AgentNotes;
        public int AssignedToAgentId { get; set; }
        public int AgentId => AssignedToAgentId;
        public string? AssignedToAgentName { get; set; }
        public int CreatedByAdminId { get; set; }
        public string? CreatedByAdminName { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime? ClosedDate { get; set; }
    }

    public class CreateAgentTaskDTO
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public TaskTypeEnum TaskType { get; set; } = TaskTypeEnum.General;
        public TaskPriorityEnum Priority { get; set; } = TaskPriorityEnum.Medium;
        public DateTime? DueDate { get; set; }
        public int AssignedToAgentId { get; set; }
        public int AgentId { get => AssignedToAgentId; set => AssignedToAgentId = value; }
    }

    public class UpdateAgentTaskDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public TaskTypeEnum TaskType { get; set; }
        public TaskPriorityEnum Priority { get; set; }
        public DateTime? DueDate { get; set; }
        public AgentTaskStatusEnum? Status { get; set; }
        public int AssignedToAgentId { get; set; }
        public int AgentId { get => AssignedToAgentId; set => AssignedToAgentId = value; }
    }

    /// <summary>
    /// Used by PATCH Tasks/{id}/ChangeStatus. Agents can move their own task forward,
    /// admins can return or close any task. Description is stored as agent notes.
    /// </summary>
    public class ChangeTaskStatusDTO
    {
        public AgentTaskStatusEnum Status { get; set; }
        public string? Description { get; set; }
    }

    /// <summary>
    /// Used by the agent to update the status of and add notes to their own task.
    /// </summary>
    public class UpdateTaskProgressDTO
    {
        public int Id { get; set; }
        public AgentTaskStatusEnum Status { get; set; }
        public string? AgentNotes { get; set; }
    }
}
