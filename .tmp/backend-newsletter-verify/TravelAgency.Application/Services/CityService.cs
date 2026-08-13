using AutoMapper;
using FluentValidation;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using TravelAgency.Application.DTOs.Geography;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Models;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.Application.Services
{
    public class CityService : ICityService
    {
        private readonly IGenericRepository<City> _repository;
        private readonly IGenericRepository<Destination> _destinationRepository;
        private readonly IGenericRepository<Tour> _tourRepository;
        private readonly IMapper _mapper;
        private readonly IValidator<CreateCityDTO> _createValidator;
        private readonly IValidator<UpdateCityDTO> _updateValidator;
        private readonly IUnitOfWork _uk;
        private readonly ILogger<CityService> _logger;


        public CityService(
            IUnitOfWork unitOfWork,
            IGenericRepository<City> repository,
            IGenericRepository<Destination> destinationRepository,
            IGenericRepository<Tour> tourRepository,
            IMapper mapper,
            IValidator<CreateCityDTO> createValidator,
            IValidator<UpdateCityDTO> updateValidator,
            ILogger<CityService> logger)
        {
            _uk = unitOfWork;
            _repository = repository;
            _destinationRepository = destinationRepository;
            _tourRepository = tourRepository;
            _mapper = mapper;
            _createValidator = createValidator;
            _updateValidator = updateValidator;
            _logger = logger;
        }

        public async Task<GenericResponse<PaginationModel<CityDTO>>> GetAllAsync(
            int pageNumber,
            int pageSize,
            int? destinationId = null,
            bool isActiveOnly = false)
        {
            try
            {
                pageSize = Math.Clamp(pageSize, 1, 100);
                var cities = await _repository.GetPaggingByIncludeAsync(
                    pageNumber,
                    pageSize,
                    city => (!isActiveOnly || city.IsActive)
                            && (!destinationId.HasValue || city.DestinationId == destinationId.Value),
                    city => city.Destination!);

                var response = new PaginationModel<CityDTO>
                {
                    Data = _mapper.Map<List<CityDTO>>(cities.Data),
                    Page = cities.Page,
                    PageSize = cities.PageSize,
                    TotalCount = cities.TotalCount
                };

                return GenericResponse<PaginationModel<CityDTO>>.Success(response);
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(CityService), nameof(GetAllAsync));
                throw;
            }
        }

        public async Task<GenericResponse<CityDetailsDTO?>> GetByIdAsync(int id)
        {
            try
            {
                var city = await _repository.GetByAsync(
                    item => item.Id == id && item.IsActive,
                    item => item.Destination!);
                if (city == null)
                    return GenericResponse<CityDetailsDTO?>.NotFound($"City with id {id} was not found.");

                var tours = await _tourRepository.GetAllByAsync(
                    tour => tour.CityId == city.Id && tour.IsActive,
                    tour => tour.Destination,
                    tour => tour.City!);

                var dto = _mapper.Map<CityDetailsDTO>(city);
                dto.TopTours = tours
                    .OrderBy(tour => tour.StartDate < DateTime.UtcNow ? 1 : 0)
                    .ThenBy(tour => tour.StartDate)
                    .ThenBy(tour => tour.Id)
                    .Take(8)
                    .Select(tour => _mapper.Map<TravelAgency.Application.DTOs.Tours.TourHomeDTO>(tour))
                    .ToList();

                return GenericResponse<CityDetailsDTO?>.Success(dto);
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(CityService), nameof(GetByIdAsync));
                throw;
            }
        }

        public async Task<GenericResponse<CityDTO>> AddAsync(CreateCityDTO model)
        {
            try
            {
                var validation = await _createValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<CityDTO>.BadRequest(
                        "Invalid city data.",
                        validation.Errors.Select(error => error.ErrorMessage));

                var destination = await _destinationRepository.GetByIdAsync(model.DestinationId!.Value);
                if (destination == null)
                    return GenericResponse<CityDTO>.BadRequest(
                        $"Destination with id {model.DestinationId} was not found.");

                var entity = _mapper.Map<City>(model);
                entity.IsActive = true;

                await _repository.AddAsync(entity);
                var saved = await _uk.CommitAsync();
                if (!saved)
                    return GenericResponse<CityDTO>.Failure("Failed to add city.");

                entity.Destination = destination;
                return GenericResponse<CityDTO>.Success(
                    _mapper.Map<CityDTO>(entity),
                    "City added successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(CityService), nameof(AddAsync));
                throw;
            }
        }

        public async Task<GenericResponse<CityDTO>> UpdateAsync(UpdateCityDTO model)
        {
            try
            {
                var validation = await _updateValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<CityDTO>.BadRequest(
                        "Invalid city data.",
                        validation.Errors.Select(error => error.ErrorMessage));

                var entity = await _repository.GetByIdAsync(model.Id);
                if (entity == null)
                    return GenericResponse<CityDTO>.NotFound($"City with id {model.Id} was not found.");

                var destination = await _destinationRepository.GetByIdAsync(model.DestinationId!.Value);
                if (destination == null)
                    return GenericResponse<CityDTO>.BadRequest(
                        $"Destination with id {model.DestinationId} was not found.");

                _mapper.Map(model, entity);
                await _repository.UpdateAsync(entity);
                await _uk.CommitAsync();
                entity.Destination = destination;
                return GenericResponse<CityDTO>.Success(
                    _mapper.Map<CityDTO>(entity),
                    "City updated successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(CityService), nameof(UpdateAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> ChangeStatusAsync(int id)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"City with id {id} was not found.");

                entity.IsActive = !entity.IsActive;
                await _repository.UpdateAsync(entity);
                await _uk.CommitAsync();
                
                return GenericResponse<bool>.Success(
                    true,
                    $"City status changed to {(entity.IsActive ? "active" : "inactive")}.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(CityService), nameof(ChangeStatusAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> DeleteAsync(int id)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"City with id {id} was not found.");

                if (await _tourRepository.CountAsync(tour => tour.CityId == id) > 0)
                    return GenericResponse<bool>.BadRequest(
                        "A city with tours cannot be deleted. Deactivate it instead.");

                await _repository.DeleteAsync(entity);
                await _uk.CommitAsync();
                return GenericResponse<bool>.Success(true, "City deleted successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(CityService), nameof(DeleteAsync));
                throw;
            }
        }
    }
}
