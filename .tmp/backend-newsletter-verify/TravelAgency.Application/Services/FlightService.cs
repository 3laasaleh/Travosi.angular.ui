using AutoMapper;
using FluentValidation;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using TravelAgency.Application.DTOs.Transport;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Models;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.Application.Services
{
    public class FlightService : IFlightService
    {
        private readonly IGenericRepository<Flight> _repository;
        private readonly IGenericRepository<Airline> _airlineRepository;
        private readonly IMapper _mapper;
        private readonly IValidator<CreateFlightDTO> _createValidator;
        private readonly IValidator<UpdateFlightDTO> _updateValidator;
        private readonly IUnitOfWork _uk;
        private readonly ILogger<FlightService> _logger;

        public FlightService(
            IUnitOfWork uk,
            IGenericRepository<Flight> repository,
            IGenericRepository<Airline> airlineRepository,
            IMapper mapper,
            IValidator<CreateFlightDTO> createValidator,
            IValidator<UpdateFlightDTO> updateValidator,
            ILogger<FlightService> logger)
        {
            _repository = repository;
            _airlineRepository = airlineRepository;
            _mapper = mapper;
            _createValidator = createValidator;
            _updateValidator = updateValidator;
            _uk= uk;
            _logger = logger;
        }

        public async Task<GenericResponse<PaginationModel<FlightDTO>>> GetAllAsync(int pageNumber, int pageSize)
        {
            try
            {
                var flights = await _repository.GetPaggingByIncludeAsync(
                    pageNumber,
                    pageSize,
                    null,
                    flight => flight.Airline!);

                var response = new PaginationModel<FlightDTO>
                {
                    Data = _mapper.Map<List<FlightDTO>>(flights.Data),
                    Page = flights.Page,
                    PageSize = flights.PageSize,
                    TotalCount = flights.TotalCount
                };

                return GenericResponse<PaginationModel<FlightDTO>>.Success(response);
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(FlightService), nameof(GetAllAsync));
                throw;
            }
        }

        public async Task<GenericResponse<FlightDTO?>> GetByIdAsync(int id)
        {
            try
            {
                var flight = await _repository.GetByAsync(f => f.Id == id, f => f.Airline!);
                if (flight == null)
                    return GenericResponse<FlightDTO?>.NotFound($"Flight with id {id} was not found.");

                return GenericResponse<FlightDTO?>.Success(_mapper.Map<FlightDTO>(flight));
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(FlightService), nameof(GetByIdAsync));
                throw;
            }
        }

        public async Task<GenericResponse<FlightDTO>> AddAsync(CreateFlightDTO model)
        {
            try
            {
                var validation = await _createValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<FlightDTO>.BadRequest("Invalid flight data.", validation.Errors.Select(e => e.ErrorMessage));

                var airline = await _airlineRepository.GetByIdAsync(model.AirlineId);
                if (airline == null)
                    return GenericResponse<FlightDTO>.BadRequest($"Airline with id {model.AirlineId} was not found.");

                var entity = _mapper.Map<Flight>(model);
                entity.IsActive = true;

                    await _repository.AddAsync(entity);
                var saved = await _uk.CommitAsync();
                if (!saved)
                    return GenericResponse<FlightDTO>.Failure("Failed to add flight.");

                return GenericResponse<FlightDTO>.Success(_mapper.Map<FlightDTO>(entity), "Flight added successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(FlightService), nameof(AddAsync));
                throw;
            }
        }

        public async Task<GenericResponse<FlightDTO>> UpdateAsync(UpdateFlightDTO model)
        {
            try
            {
                var validation = await _updateValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<FlightDTO>.BadRequest("Invalid flight data.", validation.Errors.Select(e => e.ErrorMessage));

                var entity = await _repository.GetByIdAsync(model.Id);
                if (entity == null)
                    return GenericResponse<FlightDTO>.NotFound($"Flight with id {model.Id} was not found.");

                var airline = await _airlineRepository.GetByIdAsync(model.AirlineId);
                if (airline == null)
                    return GenericResponse<FlightDTO>.BadRequest($"Airline with id {model.AirlineId} was not found.");

                _mapper.Map(model, entity);
                await _repository.UpdateAsync(entity);
                var saved = await _uk.CommitAsync();
                if (!saved)
                return GenericResponse<FlightDTO>.Failure( "Failed to update flight.");

                return GenericResponse<FlightDTO>.Success(_mapper.Map<FlightDTO>(entity), "Flight updated successfully.");

            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(FlightService), nameof(UpdateAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> ChangeStatusAsync(int id)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Flight with id {id} was not found.");

                entity.IsActive = !entity.IsActive;
                await _repository.UpdateAsync(entity);
                await _uk.CommitAsync();
                return GenericResponse<bool>.Success(
                    true,
                    $"Flight status changed to {(entity.IsActive ? "active" : "inactive")}.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(FlightService), nameof(ChangeStatusAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> DeleteAsync(int id)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Flight with id {id} was not found.");

                await _repository.DeleteAsync(entity);
                await _uk.CommitAsync();
                return GenericResponse<bool>.Success(true, "Flight deleted successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(FlightService), nameof(DeleteAsync));
                throw;
            }
        }
    }
}
