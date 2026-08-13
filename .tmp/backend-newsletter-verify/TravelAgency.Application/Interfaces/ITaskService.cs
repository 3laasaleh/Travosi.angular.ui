using TravelAgency.Application.DTOs.Tasks;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Domain.Models;

namespace TravelAgency.Application.Interfaces
{
    public interface ITaskService
    {
        // Admin
        Task<GenericResponse<PaginationModel<AgentTaskDTO>>> GetAllAsync(int pageNumber, int pageSize);
        Task<GenericResponse<AgentTaskDTO>> CreateAsync(CreateAgentTaskDTO model, int adminId);
        Task<GenericResponse<AgentTaskDTO>> UpdateAsync(UpdateAgentTaskDTO model);
        Task<GenericResponse<bool>> CloseAsync(int id);
        Task<GenericResponse<bool>> DeleteAsync(int id);

        // Agent
        Task<GenericResponse<PaginationModel<AgentTaskDTO>>> GetAllByAgentIdAsync(int pageNumber, int pageSize,int agentId);
        Task<GenericResponse<AgentTaskDTO>> UpdateProgressAsync(UpdateTaskProgressDTO model, int agentId);

        // Shared, role-aware status transition used by PATCH Tasks/{id}/ChangeStatus
        Task<GenericResponse<AgentTaskDTO>> ChangeStatusAsync(int id, ChangeTaskStatusDTO model, int userId, bool isAdmin);
    }
}
