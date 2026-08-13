using TravelAgency.Application.DTOs.User;

namespace TravelAgency.Application.Interfaces
{
    public interface IGenericService<T> where T : class
    {
        Task<GenericResponse<IList<T>>> GetAllAsync();
        Task<GenericResponse<T?>> GetByIdAsync(int id);
        Task<GenericResponse<bool>> AddAsync(T entity);
        Task<GenericResponse<bool>> UpdateAsync(T entity);
        Task<GenericResponse<bool>> DeleteAsync(int id);
    }
}
