using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.Filters;
using TravelAgency.Application.DTOs.Bookings;
using TravelAgency.Application.DTOs.Crm;
using TravelAgency.Application.DTOs.Tours;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Application.Services;
using TravelAgency.Domain.Enums;
using TravelAgency.Domain.Models;

namespace TravelAgency.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [AdminOrAgentFilter]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomersController(ICustomerService customerService)
        {
            _customerService = customerService;
        }


        /// <summary>
        /// Role-aware customer listing: admins see every customer, agents only customers assigned to them.
        /// </summary>
        [HttpGet]
        public async Task<GenericResponse<PaginationModel<CustomerDTO>>> Get([FromQuery] int page, [FromQuery] int pageSize)
        {
            var isAdmin = User.IsInRole(UserRoleEnum.Admin.ToString());
            return isAdmin
                ? await _customerService.GetAllAsync(page, pageSize)
                : await _customerService.GetByAgentAsync(page, pageSize, User.GetUserId());
        }

        /// <summary>
        /// Admin assigns a customer to an agent. The agent gets notified.
        /// </summary>
        [HttpPatch("{id:int}/AssignAgent")]
        [Authorize(Roles = "Admin")]
        public async Task<GenericResponse<bool>> AssignAgent(int id, [FromBody] AssignAgentDTO model)
            => await _customerService.AssignAgentAsync(id, model.AgentId);

        /// <summary>
        /// Toggles the customer active flag. Admins can toggle any customer, agents only their own.
        /// </summary>
        [HttpPut("{id:int}/ChangeStatus")]
        public async Task<GenericResponse<bool>> ChangeStatus(int id)
        {
            var isAdmin = User.IsInRole(UserRoleEnum.Admin.ToString());
            return await _customerService.ChangeStatusAsync(id, User.GetUserId(), isAdmin);
        }

        [HttpGet("{id:int}")]
        public async Task<GenericResponse<CustomerDTO?>> GetById(int id)
            => await _customerService.GetByIdAsync(id);

        [HttpPost]
        public async Task<GenericResponse<CustomerDTO>> Add([FromBody] CreateCustomerDTO model)
            => await _customerService.AddAsync(model, User.GetUserId(), User.IsInRole(UserRoleEnum.Admin.ToString()));

        [HttpPut]
        public async Task<GenericResponse<CustomerDTO>> Update([FromBody] UpdateCustomerDTO model)
            => await _customerService.UpdateAsync(model, User.GetUserId(), User.IsInRole(UserRoleEnum.Admin.ToString()));

        [HttpDelete("{id:int}")]
       [AdminOrAgentFilter]
        public async Task<GenericResponse<bool>> Delete(int id)
            => await _customerService.DeleteAsync(id);
    }


}
