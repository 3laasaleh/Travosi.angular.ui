using AutoMapper;
using FluentValidation;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using TravelAgency.Application.DTOs.Crm;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.Application.Services
{
    public class TravelerService : ITravelerService
    {
        private readonly IGenericRepository<Traveler> _repository;
        private readonly IGenericRepository<Customer> _customerRepository;
        private readonly IMapper _mapper;
        private readonly IValidator<CreateTravelerDTO> _createValidator;
        private readonly IValidator<UpdateTravelerDTO> _updateValidator;
        private readonly IUnitOfWork _uk;
        private readonly ILogger<TravelerService> _logger;

        public TravelerService(
            IUnitOfWork unitOfWork,
            IGenericRepository<Traveler> repository,
            IGenericRepository<Customer> customerRepository,
            IMapper mapper,
            IValidator<CreateTravelerDTO> createValidator,
            IValidator<UpdateTravelerDTO> updateValidator,
            ILogger<TravelerService> logger)
        {
            _repository = repository;
            _customerRepository = customerRepository;
            _mapper = mapper;
            _createValidator = createValidator;
            _updateValidator = updateValidator;
            _uk = unitOfWork;
            _logger = logger;
        }

        public async Task<GenericResponse<IList<TravelerDTO>>> GetByCustomerAsync(int customerId)
        {
            try
            {
                var travelers = await _repository.GetAllByAsync(t => t.CustomerId == customerId);
                return GenericResponse<IList<TravelerDTO>>.Success(_mapper.Map<IList<TravelerDTO>>(travelers.ToList()));
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TravelerService), nameof(GetByCustomerAsync));
                throw;
            }
        }

        public async Task<GenericResponse<TravelerDTO?>> GetByIdAsync(int id)
        {
            try
            {
                var traveler = await _repository.GetByIdAsync(id);
                if (traveler == null)
                    return GenericResponse<TravelerDTO?>.NotFound($"Traveler with id {id} was not found.");

                return GenericResponse<TravelerDTO?>.Success(_mapper.Map<TravelerDTO>(traveler));
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TravelerService), nameof(GetByIdAsync));
                throw;
            }
        }

        public async Task<GenericResponse<TravelerDTO>> AddAsync(CreateTravelerDTO model)
        {
            try
            {
                var validation = await _createValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<TravelerDTO>.BadRequest("Invalid traveler data.", validation.Errors.Select(e => e.ErrorMessage));

                var customer = await _customerRepository.GetByIdAsync(model.CustomerId);
                if (customer == null)
                    return GenericResponse<TravelerDTO>.BadRequest($"Customer with id {model.CustomerId} was not found.");

                var entity = _mapper.Map<Traveler>(model);
                await _repository.AddAsync(entity);

                if (!await _uk.CommitAsync())
                    return GenericResponse<TravelerDTO>.Failure("Failed to add traveler.");

                return GenericResponse<TravelerDTO>.Success(_mapper.Map<TravelerDTO>(entity), "Traveler added successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TravelerService), nameof(AddAsync));
                throw;
            }
        }

        public async Task<GenericResponse<TravelerDTO>> UpdateAsync(UpdateTravelerDTO model)
        {
            try
            {
                var validation = await _updateValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<TravelerDTO>.BadRequest("Invalid traveler data.", validation.Errors.Select(e => e.ErrorMessage));

                var entity = await _repository.GetByIdAsync(model.Id);
                if (entity == null)
                    return GenericResponse<TravelerDTO>.NotFound($"Traveler with id {model.Id} was not found.");

                _mapper.Map(model, entity);
                await _repository.UpdateAsync(entity);

                return GenericResponse<TravelerDTO>.Success(_mapper.Map<TravelerDTO>(entity), "Traveler updated successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TravelerService), nameof(UpdateAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> DeleteAsync(int id)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Traveler with id {id} was not found.");

                await _repository.DeleteAsync(entity);
                if (!await _uk.CommitAsync())
                    return GenericResponse<bool>.Failure("Failed to delete traveler.");
                return GenericResponse<bool>.Success(true, "Traveler deleted successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TravelerService), nameof(DeleteAsync));
                throw;
            }
        }
    }
}
