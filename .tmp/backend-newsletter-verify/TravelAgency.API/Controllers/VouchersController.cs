using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.Filters;
using TravelAgency.Application.DTOs.CrmDocuments;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Enums;

namespace TravelAgency.API.Controllers
{
    [ApiController, Route("api/[controller]"), Authorize, AdminOrAgentFilter]
    public class VouchersController : ControllerBase
    {
        private readonly IVoucherService _service;
        public VouchersController(IVoucherService service) => _service = service;
        private bool IsAdmin => User.IsInRole(UserRoleEnum.Admin.ToString());
        [HttpGet] public Task<GenericResponse<IList<VoucherDTO>>> Get() => _service.GetAsync(User.GetUserId(), IsAdmin);
        [HttpGet("{id:int}")] public Task<GenericResponse<VoucherDTO?>> Get(int id) => _service.GetByIdAsync(id, User.GetUserId(), IsAdmin);
        [HttpPost] public Task<GenericResponse<VoucherDTO>> Add(SaveVoucherDTO model) => _service.SaveAsync(model, User.GetUserId(), IsAdmin);
        [HttpPut] public Task<GenericResponse<VoucherDTO>> Update(SaveVoucherDTO model) => _service.SaveAsync(model, User.GetUserId(), IsAdmin);
        [HttpDelete("{id:int}")] public Task<GenericResponse<bool>> Delete(int id) => _service.DeleteAsync(id, User.GetUserId(), IsAdmin);
        [HttpGet("{id:int}/Pdf")]
        public async Task<IActionResult> Pdf(int id)
        {
            var result = await _service.GeneratePdfAsync(id, User.GetUserId(), IsAdmin);
            return !result.IsSuccess || result.Data == null ? NotFound(result) : File(result.Data, "application/pdf", $"voucher-{id}.pdf");
        }
    }
}
