using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.Filters;
using TravelAgency.Application.DTOs.Tasks;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Enums;
using TravelAgency.Domain.Models;

namespace TravelAgency.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        // ---------- Admin ----------

        /// <summary>
        /// All tasks (admin only).
        /// </summary>
        [HttpGet]
        [HttpGet("GetAllTasks")]
       [AdminOnlyFilter]
        public async Task<GenericResponse<PaginationModel<AgentTaskDTO>>> GetAll([FromQuery] int page, [FromQuery] int pageSize)
            => await _taskService.GetAllAsync(page, pageSize);


        /// <summary>
        /// Admin assigns a new task to an agent. The agent gets notified.
        /// </summary>
        [HttpPost]
        [AdminOnlyFilter]
        public async Task<GenericResponse<AgentTaskDTO>> Create([FromBody] CreateAgentTaskDTO model)
            => await _taskService.CreateAsync(model, User.GetUserId());

        [HttpPut]
       [AdminOnlyFilter]
        public async Task<GenericResponse<AgentTaskDTO>> Update([FromBody] UpdateAgentTaskDTO model)
            => await _taskService.UpdateAsync(model);

        [HttpPatch("{id:int}/Close")]
       [AdminOnlyFilter]
        public async Task<GenericResponse<bool>> Close(int id)
            => await _taskService.CloseAsync(id);

        [HttpDelete("{id:int}")]
       [AdminOnlyFilter]
        public async Task<GenericResponse<bool>> Delete(int id)
            => await _taskService.DeleteAsync(id);

        // ---------- Agent ----------

        /// <summary>
        /// Tasks assigned to the logged-in agent.
        /// </summary>
        [HttpGet("GetAgentTasks")]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<PaginationModel<AgentTaskDTO>>> GetAgentTasks([FromQuery] int page, [FromQuery] int pageSize)
            => await _taskService.GetAllByAgentIdAsync(page,  pageSize,User.GetUserId());

        /// <summary>
        /// Agent changes the status of their own task and adds notes.
        /// </summary>
        [HttpPatch("Progress")]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<AgentTaskDTO>> UpdateProgress([FromBody] UpdateTaskProgressDTO model)
            => await _taskService.UpdateProgressAsync(model, User.GetUserId());

        // ---------- Shared ----------

        /// <summary>
        /// Role-aware status transition taken from the JWT: agents can move their own tasks
        /// forward (start/complete), admins can return or close any task.
        /// </summary>
        [HttpPatch("{id:int}/ChangeStatus")]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<AgentTaskDTO>> ChangeStatus(int id, [FromBody] ChangeTaskStatusDTO model)
        {
            var isAdmin = User.IsInRole(UserRoleEnum.Admin.ToString());
            return await _taskService.ChangeStatusAsync(id, model, User.GetUserId(), isAdmin);
        }
    }
}
