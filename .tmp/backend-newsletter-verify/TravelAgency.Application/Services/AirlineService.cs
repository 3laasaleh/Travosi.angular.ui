using AutoMapper;
using FluentValidation;
using Microsoft.Extensions.Logging;
using TravelAgency.Application.DTOs.Transport;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Models;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.Application.Services
{
    public class AirlineService : IAirlineService
    {
        private readonly IGenericRepository<Airline> _repository;
        private readonly IMapper _mapper;
        private readonly IValidator<CreateAirlineDTO> _createValidator;
        private readonly IValidator<UpdateAirlineDTO> _updateValidator;
        private readonly IUnitOfWork _uk;
        private readonly ILogger<AirlineService> _logger;

        public AirlineService(
            IUnitOfWork uk,
            IGenericRepository<Airline> repository,
            IMapper mapper,
            IValidator<CreateAirlineDTO> createValidator,
            IValidator<UpdateAirlineDTO> updateValidator,
            ILogger<AirlineService> logger)
        {
            _repository = repository;
            _mapper = mapper;
            _createValidator = createValidator;
            _updateValidator = updateValidator;
            _uk = uk;
            _logger = logger;
        }

        public async Task<GenericResponse<PaginationModel<AirlineDTO>>> GetAllAsync(
            int pageNumber,
            int pageSize,
            bool isActive = false)
        {
            try
            {
                var airlines = await _repository.GetPaggingByIncludeAsync(
                    pageNumber,
                    pageSize,
                    isActive ? airline => airline.IsActive : null);

                var response = new PaginationModel<AirlineDTO>
                {
                    Data = _mapper.Map<List<AirlineDTO>>(airlines.Data),
                    Page = airlines.Page,
                    PageSize = airlines.PageSize,
                    TotalCount = airlines.TotalCount
                };

                return GenericResponse<PaginationModel<AirlineDTO>>.Success(response);
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(AirlineService), nameof(GetAllAsync));
                throw;
            }
        }

        public async Task<GenericResponse<AirlineDTO?>> GetByIdAsync(int id)
        {
            try
            {
                var airline = await _repository.GetByIdAsync(id);
                if (airline == null)
                    return GenericResponse<AirlineDTO?>.NotFound($"Airline with id {id} was not found.");

                return GenericResponse<AirlineDTO?>.Success(_mapper.Map<AirlineDTO>(airline));
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(AirlineService), nameof(GetByIdAsync));
                throw;
            }
        }

        public async Task<GenericResponse<AirlineDTO>> AddAsync(CreateAirlineDTO model)
        {
            try
            {
                var validation = await _createValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<AirlineDTO>.BadRequest("Invalid airline data.", validation.Errors.Select(e => e.ErrorMessage));

                var entity = _mapper.Map<Airline>(model);
                entity.IsActive = true;
                entity.LogoUrl = $"airlines/{model.Logo!.FileName}";
                await _repository.AddAsync(entity);
                var saved = await _uk.CommitAsync();
                if (!saved)
                    return GenericResponse<AirlineDTO>.Failure("Failed to add airline.");

                await Helper.SaveImagesAsync("airlines", model.Logo);

                return GenericResponse<AirlineDTO>.Success(_mapper.Map<AirlineDTO>(entity), "Airline added successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(AirlineService), nameof(AddAsync));
                throw;
            }
        }

        public async Task<GenericResponse<AirlineDTO>> UpdateAsync(UpdateAirlineDTO model)
        {
            try
            {
                var validation = await _updateValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<AirlineDTO>.BadRequest("Invalid airline data.", validation.Errors.Select(e => e.ErrorMessage));

                var entity = await _repository.GetByIdAsync(model.Id);
                if (entity == null)
                    return GenericResponse<AirlineDTO>.NotFound($"Airline with id {model.Id} was not found.");

                var oldLogoUrl = entity.LogoUrl;
                _mapper.Map(model, entity);
                if (model.Logo != null)
                    entity.LogoUrl = $"airlines/{model.Logo.FileName}";
                else
                    entity.LogoUrl = oldLogoUrl;
                await _repository.UpdateAsync(entity);
                var saved = await _uk.CommitAsync();
                if (!saved)
                    return GenericResponse<AirlineDTO>.Failure("Failed to update airline.");

                if (model.Logo != null)
                    await Helper.SaveImagesAsync("airlines", model.Logo);
                return GenericResponse<AirlineDTO>.Success(_mapper.Map<AirlineDTO>(entity), "Airline updated successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(AirlineService), nameof(UpdateAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> DeleteLogoAsync(int id)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Airline with id {id} was not found.");

                DeleteStoredLogo(entity.LogoUrl);
                entity.LogoUrl = null;
                await _repository.UpdateAsync(entity);
                await _uk.CommitAsync();
                return GenericResponse<bool>.Success(true, "Airline logo deleted successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(AirlineService), nameof(DeleteLogoAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> ChangeStatusAsync(int id)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Airline with id {id} was not found.");

                entity.IsActive = !entity.IsActive;
                await _repository.UpdateAsync(entity);
                var saved = await _uk.CommitAsync();
                return GenericResponse<bool>.Success(
                    true,
                    $"Airline status changed to {(entity.IsActive ? "active" : "inactive")}.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(AirlineService), nameof(ChangeStatusAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> DeleteAsync(int id)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Airline with id {id} was not found.");

                await _repository.DeleteAsync(entity);
                var saved = await _uk.CommitAsync();
                DeleteStoredLogo(entity.LogoUrl);
                return GenericResponse<bool>.Success(true, "Airline deleted successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(AirlineService), nameof(DeleteAsync));
                throw;
            }
        }

        private static void DeleteStoredLogo(string? logoUrl)
        {
            if (string.IsNullOrWhiteSpace(logoUrl)) return;
            var fileName = Path.GetFileName(logoUrl);
            var path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "airlines", fileName);
            if (File.Exists(path)) File.Delete(path);
        }
    }


}
