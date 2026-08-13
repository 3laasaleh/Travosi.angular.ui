using TravelAgency.Application.DTOs.Crm;
using TravelAgency.Application.DTOs.Packages;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Domain.Models;

namespace TravelAgency.Application.Interfaces
{
    public interface ICustomerService
    {
        Task<GenericResponse<PaginationModel<CustomerDTO>>> GetAllAsync(int pageNumber, int pageSize);
        Task<GenericResponse<PaginationModel<CustomerDTO>>> GetByAgentAsync(int pageNumber, int pageSize, int agentId);
        Task<GenericResponse<CustomerDTO?>> GetByIdAsync(int id);
        Task<GenericResponse<CustomerDTO>> AddAsync(CreateCustomerDTO model, int currentUserId, bool isAdmin);
        Task<GenericResponse<CustomerDTO>> UpdateAsync(UpdateCustomerDTO model, int currentUserId, bool isAdmin);
        Task<GenericResponse<bool>> AssignAgentAsync(int customerId, int agentId);
        Task<GenericResponse<bool>> ChangeStatusAsync(int id, int userId, bool isAdmin);
        Task<GenericResponse<bool>> DeleteAsync(int id);
    }

}
