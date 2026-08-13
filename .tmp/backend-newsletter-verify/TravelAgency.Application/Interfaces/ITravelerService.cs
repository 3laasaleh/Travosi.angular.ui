using System;
using System.Collections.Generic;
using System.Text;
using TravelAgency.Application.DTOs.Crm;
using TravelAgency.Application.DTOs.User;

namespace TravelAgency.Application.Interfaces
{

    public interface ITravelerService
    {
        Task<GenericResponse<IList<TravelerDTO>>> GetByCustomerAsync(int customerId);
        Task<GenericResponse<TravelerDTO?>> GetByIdAsync(int id);
        Task<GenericResponse<TravelerDTO>> AddAsync(CreateTravelerDTO model);
        Task<GenericResponse<TravelerDTO>> UpdateAsync(UpdateTravelerDTO model);
        Task<GenericResponse<bool>> DeleteAsync(int id);
    }
}
