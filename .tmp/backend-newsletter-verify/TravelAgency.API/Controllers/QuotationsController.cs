using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TravelAgency.API.Filters;
using TravelAgency.Application.DTOs.Quotations;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Enums;

namespace TravelAgency.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    [AdminOrAgentFilter]
    public class QuotationsController : ControllerBase
    {
        private readonly IQuotationService _quotationService;

        public QuotationsController(IQuotationService quotationService)
        {
            _quotationService = quotationService;
        }

        /// <summary>
        /// Role-aware quotation listing: admins see the agency, agents see only their own quotations.
        /// </summary>
        [HttpGet]
        public async Task<GenericResponse<IList<QuotationDTO>>> Get([FromQuery] int page, [FromQuery] int pageSize)
        {
            var isAdmin = User.IsInRole(UserRoleEnum.Admin.ToString());
            return isAdmin
                ? await _quotationService.GetAllAsync()
                : await _quotationService.GetByAgentAsync(User.GetUserId());
        }

        /// <summary>
        /// Quotations created by the logged in sales agent.
        /// </summary>
        [HttpGet("Mine")]
        public async Task<GenericResponse<IList<QuotationDTO>>> GetMine()
            => await _quotationService.GetByAgentAsync(User.GetUserId());

        /// <summary>
        /// Quotation history for one customer.
        /// </summary>
        [HttpGet("ByCustomer/{customerId:int}")]
        public async Task<GenericResponse<IList<QuotationDTO>>> GetByCustomer(int customerId)
            => await _quotationService.GetByCustomerAsync(
                customerId,
                User.GetUserId(),
                User.IsInRole(UserRoleEnum.Admin.ToString()));

        /// <summary>
        /// Pipeline counters and conversion rate. Admins see the whole agency, agents see their own.
        /// </summary>
        [HttpGet("Summary")]
        public async Task<GenericResponse<QuotationSummaryDTO>> GetSummary()
        {
            var isAdmin = User.IsInRole(UserRoleEnum.Admin.ToString());
            return await _quotationService.GetSummaryAsync(isAdmin ? null : User.GetUserId());
        }

        [HttpGet("{id:int}")]
        public async Task<GenericResponse<QuotationDTO?>> GetById(int id)
            => await _quotationService.GetByIdAsync(
                id,
                User.GetUserId(),
                User.IsInRole(UserRoleEnum.Admin.ToString()));

        /// <summary>
        /// Sales agent creates a quotation for a customer.
        /// </summary>
        [HttpPost]
        public async Task<GenericResponse<QuotationDTO>> Add([FromBody] CreateQuotationDTO model)
            => await _quotationService.AddAsync(
                model,
                User.GetUserId(),
                User.IsInRole(UserRoleEnum.Admin.ToString()));

        [HttpPut]
        public async Task<GenericResponse<QuotationDTO>> Update([FromBody] UpdateQuotationDTO model)
            => await _quotationService.UpdateAsync(
                model,
                User.GetUserId(),
                User.IsInRole(UserRoleEnum.Admin.ToString()));

        /// <summary>
        /// Moves a draft quotation to Sent so the customer can accept or reject it.
        /// </summary>
        [HttpPatch("{id:int}/Send")]
        public async Task<GenericResponse<bool>> Send(int id)
            => await _quotationService.SendAsync(
                id,
                User.GetUserId(),
                User.IsInRole(UserRoleEnum.Admin.ToString()));

        /// <summary>
        /// Creates a new editable draft revision from an existing quotation.
        /// </summary>
        [HttpPost("{id:int}/Duplicate")]
        public async Task<GenericResponse<QuotationDTO>> Duplicate(int id)
            => await _quotationService.DuplicateAsync(
                id,
                User.GetUserId(),
                User.IsInRole(UserRoleEnum.Admin.ToString()));

        /// <summary>
        /// Applies a status transition (Sent -> Accepted/Rejected/Cancelled, etc.).
        /// </summary>
        [HttpPatch("ChangeStatus")]
        public async Task<GenericResponse<bool>> ChangeStatus([FromBody] ChangeQuotationStatusDTO model)
            => await _quotationService.ChangeStatusAsync(
                model,
                User.GetUserId(),
                User.IsInRole(UserRoleEnum.Admin.ToString()));

        [HttpDelete("{id:int}")]
        public async Task<GenericResponse<bool>> Delete(int id)
            => await _quotationService.DeleteAsync(
                id,
                User.GetUserId(),
                User.IsInRole(UserRoleEnum.Admin.ToString()));

        /// <summary>
        /// Downloads the quotation as a PDF file for the Angular frontend.
        /// </summary>
        [HttpGet("{id:int}/Pdf")]
        public async Task<IActionResult> DownloadPdf(int id)
        {
            var result = await _quotationService.GeneratePdfAsync(
                id,
                User.GetUserId(),
                User.IsInRole(UserRoleEnum.Admin.ToString()));
            if (!result.IsSuccess || result.Data is null)
                return NotFound(result);

            return File(result.Data, "application/pdf", $"quotation-{id}.pdf");
        }
    }
}
