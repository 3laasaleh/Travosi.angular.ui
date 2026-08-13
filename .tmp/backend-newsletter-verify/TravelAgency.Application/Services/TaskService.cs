using AutoMapper;
using FluentValidation;
using Microsoft.Extensions.Logging;
using TravelAgency.Application.DTOs.Packages;
using TravelAgency.Application.DTOs.Tasks;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Enums;
using TravelAgency.Domain.Models;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.Application.Services
{
    public class TaskService : ITaskService
    {
        private readonly IUnitOfWork _uk;

        private readonly IGenericRepository<AgentTask> _repository;
        private readonly IGenericRepository<User> _userRepository;
        private readonly INotificationService _notificationService;
        private readonly IMapper _mapper;
        private readonly ILogger<TaskService> _logger;
        private readonly IValidator<CreateAgentTaskDTO> _createValidator;
        private readonly IValidator<UpdateAgentTaskDTO> _updateValidator;
        private readonly IValidator<UpdateTaskProgressDTO> _progressValidator;

        public TaskService(
            IUnitOfWork uk,
            IGenericRepository<AgentTask> repository,
            IGenericRepository<User> userRepository,
            INotificationService notificationService,
            IMapper mapper,
            ILogger<TaskService> logger,
            IValidator<CreateAgentTaskDTO> createValidator,
            IValidator<UpdateAgentTaskDTO> updateValidator,
            IValidator<UpdateTaskProgressDTO> progressValidator)
        {
            _repository = repository;
            _userRepository = userRepository;
            _notificationService = notificationService;
            _mapper = mapper;
            _logger = logger;
            _createValidator = createValidator;
            _updateValidator = updateValidator;
            _progressValidator = progressValidator;
            _uk = uk;
        }

        public async Task<GenericResponse<PaginationModel<AgentTaskDTO>>> GetAllAsync(int pageNumber, int pageSize)
        {
            try
            {
                var d = await _repository.GetPaggingByIncludeAsync(pageNumber,pageSize, null,t => t.AssignedToAgent!, t => t.CreatedByAdmin!);

                var data= d.Data.OrderByDescending(t => t.CreatedDate).ToList();
                var res = new PaginationModel<AgentTaskDTO>
                {
                    Data = _mapper.Map<List<AgentTaskDTO>>(data),
                    Page = d.Page,
                    PageSize = d.PageSize,
                    TotalCount = d.TotalCount
                };
                return GenericResponse<PaginationModel<AgentTaskDTO>>.Success(res);
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TaskService), nameof(GetAllAsync));
                throw;
            }
        }
        public async Task<GenericResponse<PaginationModel<AgentTaskDTO>>> GetAllByAgentIdAsync(int pageNumber, int pageSize, int agentId)
        {
            try
            {
                var d = await _repository.GetPaggingByIncludeAsync(pageNumber, pageSize, s=>s.AssignedToAgentId==agentId, t => t.AssignedToAgent!, t => t.CreatedByAdmin!);

                var data = d.Data.OrderByDescending(t => t.CreatedDate).ToList();
                var res = new PaginationModel<AgentTaskDTO>
                {
                    Data = _mapper.Map<List<AgentTaskDTO>>(data),
                    Page = d.Page,
                    PageSize = d.PageSize,
                    TotalCount = d.TotalCount
                };
                return GenericResponse<PaginationModel<AgentTaskDTO>>.Success(res);
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TaskService), nameof(GetAllByAgentIdAsync));
                throw;
            }
        }

        public async Task<GenericResponse<AgentTaskDTO>> CreateAsync(CreateAgentTaskDTO model, int adminId)
        {
            try
            {
                var validation = await _createValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<AgentTaskDTO>.BadRequest("Invalid task data.", validation.Errors.Select(e => e.ErrorMessage));

                var agent = await _userRepository.GetByIdAsync(model.AssignedToAgentId);
                if (agent == null)
                    return GenericResponse<AgentTaskDTO>.BadRequest($"Agent with id {model.AssignedToAgentId} was not found.");

                if (agent.Role != UserRoleEnum.Agent)
                    return GenericResponse<AgentTaskDTO>.BadRequest("Tasks can only be assigned to users with the Agent role.");

                var entity = _mapper.Map<AgentTask>(model);
                entity.CreatedByAdminId = adminId;
                entity.Status = AgentTaskStatusEnum.Pending;
                entity.CreatedDate = DateTime.UtcNow;
                entity.UpdatedDate = DateTime.UtcNow;
                await _repository.AddAsync(entity);
                var saved = await _uk.CommitAsync();
                if (!saved)
                    return GenericResponse<AgentTaskDTO>.Failure("Failed to create task.");

                await _notificationService.CreateAsync(
                    entity.AssignedToAgentId,
                    "New task assigned",
                    $"You have a new task: '{entity.Title}' (priority {entity.Priority}).",
                    NotificationTypeEnum.TaskAssigned,
                    entity.Id);

                _logger.LogInformation("Task {Id} created by admin {AdminId} for agent {AgentId}", entity.Id, adminId, entity.AssignedToAgentId);

                var created = await _repository.GetByAsync(t => t.Id == entity.Id, t => t.AssignedToAgent!, t => t.CreatedByAdmin!);
                return GenericResponse<AgentTaskDTO>.Success(_mapper.Map<AgentTaskDTO>(created), "Task created and agent notified.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TaskService), nameof(CreateAsync));
                throw;
            }
        }

        public async Task<GenericResponse<AgentTaskDTO>> UpdateAsync(UpdateAgentTaskDTO model)
        {
            try
            {
                var validation = await _updateValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<AgentTaskDTO>.BadRequest("Invalid task data.", validation.Errors.Select(e => e.ErrorMessage));

                var entity = await _repository.GetByIdAsync(model.Id);
                if (entity == null)
                    return GenericResponse<AgentTaskDTO>.NotFound($"Task with id {model.Id} was not found.");

                if (entity.Status == AgentTaskStatusEnum.Closed)
                    return GenericResponse<AgentTaskDTO>.BadRequest("A closed task cannot be edited.");

                var agent = await _userRepository.GetByIdAsync(model.AssignedToAgentId);
                if (agent == null || agent.Role != UserRoleEnum.Agent)
                    return GenericResponse<AgentTaskDTO>.BadRequest("Tasks can only be assigned to users with the Agent role.");

                var previousAgentId = entity.AssignedToAgentId;

                _mapper.Map(model, entity);
                if (model.Status.HasValue)
                    entity.Status = model.Status.Value;
                entity.UpdatedDate = DateTime.UtcNow;
                await _repository.UpdateAsync(entity);
                var saved = await _uk.CommitAsync();
                var reassigned = previousAgentId != entity.AssignedToAgentId;
                await _notificationService.CreateAsync(
                    entity.AssignedToAgentId,
                    reassigned ? "Task assigned to you" : "Task updated",
                    $"Task '{entity.Title}' has been {(reassigned ? "assigned to you" : "updated")}.",
                    reassigned ? NotificationTypeEnum.TaskAssigned : NotificationTypeEnum.TaskUpdated,
                    entity.Id);

                var updated = await _repository.GetByAsync(t => t.Id == entity.Id, t => t.AssignedToAgent!, t => t.CreatedByAdmin!);
                return GenericResponse<AgentTaskDTO>.Success(_mapper.Map<AgentTaskDTO>(updated), "Task updated successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TaskService), nameof(UpdateAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> CloseAsync(int id)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Task with id {id} was not found.");

                if (entity.Status == AgentTaskStatusEnum.Closed)
                    return GenericResponse<bool>.BadRequest("Task is already closed.");

                entity.Status = AgentTaskStatusEnum.Closed;
                entity.ClosedDate = DateTime.UtcNow;
                entity.UpdatedDate = DateTime.UtcNow;
                await _repository.UpdateAsync(entity);

                await _notificationService.CreateAsync(
                    entity.AssignedToAgentId,
                    "Task closed",
                    $"Task '{entity.Title}' has been closed.",
                    NotificationTypeEnum.TaskClosed,
                    entity.Id);
                var saved = await _uk.CommitAsync();
                return GenericResponse<bool>.Success(true, "Task closed successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TaskService), nameof(CloseAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> DeleteAsync(int id)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Task with id {id} was not found.");

                await _repository.DeleteAsync(entity);
                var saved = await _uk.CommitAsync();
                return GenericResponse<bool>.Success(true, "Task deleted successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TaskService), nameof(DeleteAsync));
                throw;
            }
        }

        public async Task<GenericResponse<IList<AgentTaskDTO>>> GetAllByAgentIdAsync(int agentId)
        {
            try
            {
                var tasks = await _repository.GetAllByAsync(
                    t => t.AssignedToAgentId == agentId,
                    t => t.AssignedToAgent!, t => t.CreatedByAdmin!);

                var ordered = tasks.OrderByDescending(t => t.CreatedDate).ToList();
                return GenericResponse<IList<AgentTaskDTO>>.Success(_mapper.Map<IList<AgentTaskDTO>>(ordered));
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TaskService), nameof(GetAllByAgentIdAsync));
                throw;
            }
        }

        public async Task<GenericResponse<AgentTaskDTO>> ChangeStatusAsync(int id, ChangeTaskStatusDTO model, int userId, bool isAdmin)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                    return GenericResponse<AgentTaskDTO>.NotFound($"Task with id {id} was not found.");

                if (entity.Status == AgentTaskStatusEnum.Closed)
                    return GenericResponse<AgentTaskDTO>.BadRequest("A closed task cannot be updated.");

                if (!isAdmin)
                {
                    if (entity.AssignedToAgentId != userId)
                        return GenericResponse<AgentTaskDTO>.Unauthorized("You can only update tasks assigned to you.");

                    var allowed = model.Status switch
                    {
                        AgentTaskStatusEnum.InProgress => entity.Status is AgentTaskStatusEnum.Pending or AgentTaskStatusEnum.Returned,
                        AgentTaskStatusEnum.Completed => entity.Status == AgentTaskStatusEnum.InProgress,
                        _ => false
                    };

                    if (!allowed)
                        return GenericResponse<AgentTaskDTO>.BadRequest($"Agents cannot move a task from {entity.Status} to {model.Status}.");
                }

                entity.Status = model.Status;
                if (!string.IsNullOrWhiteSpace(model.Description))
                    entity.AgentNotes = model.Description;
                entity.UpdatedDate = DateTime.UtcNow;
                if (model.Status == AgentTaskStatusEnum.Closed)
                    entity.ClosedDate = DateTime.UtcNow;

                await _repository.UpdateAsync(entity);

                var notifyUserId = isAdmin ? entity.AssignedToAgentId : entity.CreatedByAdminId;
                await _notificationService.CreateAsync(
                    notifyUserId,
                    isAdmin ? "Task status changed" : "Task progress updated",
                    $"Task '{entity.Title}' status changed to {entity.Status}.",
                    model.Status == AgentTaskStatusEnum.Closed ? NotificationTypeEnum.TaskClosed : NotificationTypeEnum.TaskUpdated,
                    entity.Id);
                var saved = await _uk.CommitAsync();
                var updated = await _repository.GetByAsync(t => t.Id == entity.Id, t => t.AssignedToAgent!, t => t.CreatedByAdmin!);
                return GenericResponse<AgentTaskDTO>.Success(_mapper.Map<AgentTaskDTO>(updated), $"Task status changed to {entity.Status}.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TaskService), nameof(ChangeStatusAsync));
                throw;
            }
        }

        public async Task<GenericResponse<AgentTaskDTO>> UpdateProgressAsync(UpdateTaskProgressDTO model, int agentId)
        {
            try
            {
                var validation = await _progressValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<AgentTaskDTO>.BadRequest("Invalid request.", validation.Errors.Select(e => e.ErrorMessage));

                if (model.Status == AgentTaskStatusEnum.Closed)
                    return GenericResponse<AgentTaskDTO>.BadRequest("Only an administrator can close a task.");

                var entity = await _repository.GetByIdAsync(model.Id);
                if (entity == null)
                    return GenericResponse<AgentTaskDTO>.NotFound($"Task with id {model.Id} was not found.");

                if (entity.AssignedToAgentId != agentId)
                    return GenericResponse<AgentTaskDTO>.Unauthorized("You can only update tasks assigned to you.");

                if (entity.Status == AgentTaskStatusEnum.Closed)
                    return GenericResponse<AgentTaskDTO>.BadRequest("A closed task cannot be updated.");

                entity.Status = model.Status;
                if (model.AgentNotes != null)
                    entity.AgentNotes = model.AgentNotes;
                entity.UpdatedDate = DateTime.UtcNow;
                await _repository.UpdateAsync(entity);

                await _notificationService.CreateAsync(
                    entity.CreatedByAdminId,
                    "Task progress updated",
                    $"Agent updated task '{entity.Title}' to status {entity.Status}.",
                    NotificationTypeEnum.TaskUpdated,
                    entity.Id);

                var saved = await _uk.CommitAsync();
                var updated = await _repository.GetByAsync(t => t.Id == entity.Id, t => t.AssignedToAgent!, t => t.CreatedByAdmin!);
                return GenericResponse<AgentTaskDTO>.Success(_mapper.Map<AgentTaskDTO>(updated), "Task progress updated.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TaskService), nameof(UpdateProgressAsync));
                throw;
            }
        }
    }
}
