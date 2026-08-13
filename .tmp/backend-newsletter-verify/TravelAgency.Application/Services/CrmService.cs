using AutoMapper;
using FluentValidation;
using Microsoft.Extensions.Logging;
using TravelAgency.Application.DTOs.Crm;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Enums;
using TravelAgency.Domain.Models;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.Application.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly IGenericRepository<Customer> _repository;
        private readonly IGenericRepository<Traveler> _travelerRepository;
        private readonly IGenericRepository<User> _userRepository;
        private readonly INotificationService _notificationService;
        private readonly IMapper _mapper;
        private readonly IValidator<CreateCustomerDTO> _createValidator;
        private readonly IValidator<UpdateCustomerDTO> _updateValidator;
        private readonly IUnitOfWork _uk;
        private readonly ILogger<CustomerService> _logger;


        public CustomerService(
             IUnitOfWork uk,
            IGenericRepository<Customer> repository,
            IGenericRepository<Traveler> travelerRepository,
            IGenericRepository<User> userRepository,
            INotificationService notificationService,
            IMapper mapper,
            IValidator<CreateCustomerDTO> createValidator,
            IValidator<UpdateCustomerDTO> updateValidator,
            ILogger<CustomerService> logger)
        {
            _repository = repository;
            _travelerRepository = travelerRepository;
            _userRepository = userRepository;
            _notificationService = notificationService;
            _mapper = mapper;
            _createValidator = createValidator;
            _updateValidator = updateValidator;
            _uk = uk;
            _logger = logger;

        }

        public async Task<GenericResponse<PaginationModel<CustomerDTO>>> GetAllAsync(int pageNumber, int pageSize)
            {
            try
            {
                return await GetPageAsync(pageNumber, pageSize, null);
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(CustomerService), nameof(GetAllAsync));
                throw;
            }
        }

        public async Task<GenericResponse<PaginationModel<CustomerDTO>>> GetByAgentAsync(int pageNumber, int pageSize, int agentId)
            {
            try
            {
                return await GetPageAsync(pageNumber, pageSize, agentId);
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(CustomerService), nameof(GetByAgentAsync));
                throw;
            }
        }

        public async Task<GenericResponse<CustomerDTO?>> GetByIdAsync(int id)
        {
            try
            {
                var customer = await _repository.GetByAsync(c => c.Id == id, c => c.Travelers, c => c.Agent!);
                if (customer == null)
                    return GenericResponse<CustomerDTO?>.NotFound($"Customer with id {id} was not found.");

                return GenericResponse<CustomerDTO?>.Success(_mapper.Map<CustomerDTO>(customer));
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(CustomerService), nameof(GetByIdAsync));
                throw;
            }
        }

        public async Task<GenericResponse<CustomerDTO>> AddAsync(CreateCustomerDTO model, int currentUserId, bool isAdmin)
        {
            try
            {
                var validation = await _createValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<CustomerDTO>.BadRequest("Invalid customer data.", validation.Errors.Select(e => e.ErrorMessage));

                var duplicate = await _repository.GetByAsync(c => c.Email.ToLower() == model.Email.ToLower());
                if (duplicate != null)
                    return GenericResponse<CustomerDTO>.BadRequest($"A customer with email '{model.Email}' already exists.");

                var agentResult = await ResolveAgentAsync(model.AgentId, currentUserId, isAdmin);
                if (agentResult.Error != null)
                    return GenericResponse<CustomerDTO>.BadRequest(agentResult.Error);

                var travelers = BuildTravelers(model);
                var travelerError = await ValidateTravelersAsync(travelers, null);
                if (travelerError != null)
                    return GenericResponse<CustomerDTO>.BadRequest(travelerError);

                var entity = _mapper.Map<Customer>(model);
                entity.AgentId = agentResult.Agent!.Id;
                entity.CreatedAt = DateTime.UtcNow;
                entity.IsActive = true;
                entity.Travelers = travelers;

                await _repository.AddAsync(entity);

                await NotifyAssignmentAsync(entity, agentResult.Agent.Id);

                if(! await _uk.CommitAsync())
                    return GenericResponse<CustomerDTO>.Failure("Failed to add customer.");

                var saved = await _repository.GetByAsync(c => c.Id == entity.Id, c => c.Travelers, c => c.Agent!);
                return GenericResponse<CustomerDTO>.Success(_mapper.Map<CustomerDTO>(saved ?? entity),
                    "Customer, travelers, and agent assignment saved successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(CustomerService), nameof(AddAsync));
                throw;
            }
        }

        public async Task<GenericResponse<CustomerDTO>> UpdateAsync(UpdateCustomerDTO model, int currentUserId, bool isAdmin)
        {
            try
            {
                var validation = await _updateValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<CustomerDTO>.BadRequest("Invalid customer data.", validation.Errors.Select(e => e.ErrorMessage));

                var entity = await _repository.GetByAsync(c => c.Id == model.Id, c => c.Travelers, c => c.Agent!);
                if (entity == null)
                    return GenericResponse<CustomerDTO>.NotFound($"Customer with id {model.Id} was not found.");

                if (!isAdmin && entity.AgentId != currentUserId)
                    return GenericResponse<CustomerDTO>.Unauthorized("You can only update customers assigned to you.");

                var duplicate = await _repository.GetByAsync(c => c.Email.ToLower() == model.Email.ToLower() && c.Id != model.Id);
                if (duplicate != null)
                    return GenericResponse<CustomerDTO>.BadRequest($"A customer with email '{model.Email}' already exists.");

                var agentResult = await ResolveAgentAsync(model.AgentId, currentUserId, isAdmin);
                if (agentResult.Error != null)
                    return GenericResponse<CustomerDTO>.BadRequest(agentResult.Error);

                var travelers = BuildTravelers(model);
                var travelerError = await ValidateTravelersAsync(travelers, model.Id);
                if (travelerError != null)
                    return GenericResponse<CustomerDTO>.BadRequest(travelerError);

                var previousAgentId = entity.AgentId;
                var oldTravelers = entity.Travelers.ToList();
                if (oldTravelers.Count > 0)
                    await _travelerRepository.DeleteListAsync(oldTravelers);

                _mapper.Map(model, entity);
                entity.AgentId = agentResult.Agent!.Id;
                entity.Travelers = travelers;
                await _repository.UpdateAsync(entity);

                if (previousAgentId != entity.AgentId)
                    await NotifyAssignmentAsync(entity, entity.AgentId.Value);

                var saved = await _repository.GetByAsync(c => c.Id == entity.Id, c => c.Travelers, c => c.Agent!);
                return GenericResponse<CustomerDTO>.Success(_mapper.Map<CustomerDTO>(saved ?? entity), "Customer and travelers updated successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(CustomerService), nameof(UpdateAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> AssignAgentAsync(int customerId, int agentId)
        {
            try
            {
                var agent = await _userRepository.GetByIdAsync(agentId);
                if (agent == null || agent.Role != UserRoleEnum.Agent || !agent.IsActivated)
                    return GenericResponse<bool>.BadRequest("Select an active agent.");

                var entity = await _repository.GetByIdAsync(customerId);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Customer with id {customerId} was not found.");

                entity.AgentId = agentId;
                await _repository.UpdateAsync(entity);
                await NotifyAssignmentAsync(entity, agentId);
                return GenericResponse<bool>.Success(true, "Customer assigned and agent notified successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(CustomerService), nameof(AssignAgentAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> ChangeStatusAsync(int id, int userId, bool isAdmin)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Customer with id {id} was not found.");

                if (!isAdmin && entity.AgentId != userId)
                    return GenericResponse<bool>.Unauthorized("You can only update customers assigned to you.");

                entity.IsActive = !entity.IsActive;
                await _repository.UpdateAsync(entity);
                return GenericResponse<bool>.Success(true, entity.IsActive ? "Customer activated." : "Customer deactivated.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(CustomerService), nameof(ChangeStatusAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> DeleteAsync(int id)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Customer with id {id} was not found.");

                await _repository.DeleteAsync(entity);
                return GenericResponse<bool>.Success(true, "Customer deleted successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(CustomerService), nameof(DeleteAsync));
                throw;
            }
        }

        private async Task<GenericResponse<PaginationModel<CustomerDTO>>> GetPageAsync(int pageNumber, int pageSize, int? agentId)
        {
            var page = await _repository.GetPaggingByIncludeAsync(pageNumber, pageSize,
                agentId.HasValue ? c => c.AgentId == agentId.Value : null,
                c => c.Travelers, c => c.Agent!);
            return GenericResponse<PaginationModel<CustomerDTO>>.Success(new PaginationModel<CustomerDTO>
            {
                Data = _mapper.Map<List<CustomerDTO>>(page.Data),
                Page = page.Page,
                PageSize = page.PageSize,
                TotalCount = page.TotalCount
            });
        }

        private async Task<(User? Agent, string? Error)> ResolveAgentAsync(int? requestedAgentId, int currentUserId, bool isAdmin)
        {
            var agentId = isAdmin ? requestedAgentId : currentUserId;
            if (!agentId.HasValue || agentId.Value <= 0)
                return (null, "An agent assignment is required.");

            var agent = await _userRepository.GetByIdAsync(agentId.Value);
            if (agent == null || agent.Role != UserRoleEnum.Agent || !agent.IsActivated)
                return (null, "Select an active agent.");

            return (agent, null);
        }

        private List<Traveler> BuildTravelers(CreateCustomerDTO model)
        {
            var travelers = new List<Traveler>
            {
                new()
                {
                    FirstName = model.FirstName!.Trim(),
                    LastName = model.LastName!.Trim(),
                    PassportNumber = model.PassportNumber.Trim(),
                    DateOfBirth = model.DateOfBirth,
                    Gender = model.Gender,
                    TravelerType = TravelerTypeEnum.Adult,
                    Relationship = "Primary",
                    IsPrimary = true
                }
            };

            travelers.AddRange(model.Travelers.Select(item =>
            {
                var traveler = _mapper.Map<Traveler>(item);
                traveler.Id = 0;
                traveler.CustomerId = null;
                traveler.Customer = null;
                traveler.IsPrimary = false;
                traveler.Relationship = item.Relationship.Trim();
                return traveler;
            }));
            return travelers;
        }

        private async Task<string?> ValidateTravelersAsync(IList<Traveler> travelers, int? customerId)
        {
            var passports = travelers.Select(t => t.PassportNumber.Trim().ToUpperInvariant()).ToList();
            if (passports.Distinct().Count() != passports.Count)
                return "Every traveler must have a unique passport number.";

            var existing = await _travelerRepository.GetByAsync(t =>
                passports.Contains(t.PassportNumber.ToUpper()) && (!customerId.HasValue || t.CustomerId != customerId.Value));
            return existing == null ? null : $"Passport number '{existing.PassportNumber}' is already registered.";
        }

        private async Task NotifyAssignmentAsync(Customer customer, int agentId)
        {
            var customerName = customer.CompanyName ?? $"{customer.FirstName} {customer.LastName}";
            await _notificationService.CreateAsync(agentId, "Customer assigned",
                $"Customer '{customerName}' has been assigned to you.", NotificationTypeEnum.TaskAssigned, customer.Id);
        }
    }
}
