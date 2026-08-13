using Microsoft.Extensions.Logging;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.Application.Services
{
    public class GenericService<T> : IGenericService<T> where T : class
    {
        protected readonly IGenericRepository<T> _repository;
        protected readonly ILogger _logger;
        private readonly IUnitOfWork _uk;


        public GenericService(IGenericRepository<T> repository, ILogger logger,IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _logger = logger;
            _uk = unitOfWork;
        }

        public virtual async Task<GenericResponse<IList<T>>> GetAllAsync()
        {
            try
            {
                var items = await _repository.GetAllAsync();
                return GenericResponse<IList<T>>.Success(items);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all {EntityType}", typeof(T).Name);
                return GenericResponse<IList<T>>.Failure($"Failed to retrieve {typeof(T).Name} records.", ex);
            }
        }

        public virtual async Task<GenericResponse<T?>> GetByIdAsync(int id)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                    return GenericResponse<T?>.NotFound($"{typeof(T).Name} with id {id} was not found.");

                return GenericResponse<T?>.Success(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving {EntityType} with id {Id}", typeof(T).Name, id);
                return GenericResponse<T?>.Failure($"Failed to retrieve {typeof(T).Name}.", ex);
            }
        }

        public virtual async Task<GenericResponse<bool>> AddAsync(T entity)
        {
            try
            {
                await _repository.AddAsync(entity);
                var result = await _uk.CommitAsync();
                if (result)
                {
                    return GenericResponse<bool>.Success(true, $"{typeof(T).Name} added successfully.");
                }
                return GenericResponse<bool>.Failure($"Failed to add {typeof(T).Name}.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding {EntityType}", typeof(T).Name);
                return GenericResponse<bool>.Failure($"Failed to add {typeof(T).Name}.", ex);
            }
        }

        public virtual async Task<GenericResponse<bool>> UpdateAsync(T entity)
        {
            try
            {
                await _repository.UpdateAsync(entity);
                var result = await _uk.CommitAsync();
                if (result)
                {
                    return GenericResponse<bool>.Success(true, $"{typeof(T).Name} updated successfully.");
                }
                return GenericResponse<bool>.Failure($"Failed to update {typeof(T).Name}.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating {EntityType}", typeof(T).Name);
                return GenericResponse<bool>.Failure($"Failed to update {typeof(T).Name}.", ex);
            }
        }

        public virtual async Task<GenericResponse<bool>> DeleteAsync(int id)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"{typeof(T).Name} with id {id} was not found.");

                await _repository.DeleteAsync(entity);
                var result = await _uk.CommitAsync();
                if (result)
                {
                    return GenericResponse<bool>.Success(true, $"{typeof(T).Name} deleted successfully.");
                }
                return GenericResponse<bool>.Failure($"Failed to delete {typeof(T).Name}.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting {EntityType} with id {Id}", typeof(T).Name, id);
                return GenericResponse<bool>.Failure($"Failed to delete {typeof(T).Name}.", ex);
            }
        }
    }
}
