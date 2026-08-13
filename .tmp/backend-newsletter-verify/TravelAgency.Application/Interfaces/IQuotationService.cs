using TravelAgency.Application.DTOs.Quotations;
using TravelAgency.Application.DTOs.User;

namespace TravelAgency.Application.Interfaces
{
    public interface IQuotationService
    {
        Task<GenericResponse<IList<QuotationDTO>>> GetAllAsync();
        Task<GenericResponse<IList<QuotationDTO>>> GetByAgentAsync(int salesAgentId);
        Task<GenericResponse<IList<QuotationDTO>>> GetByCustomerAsync(int customerId, int currentUserId, bool isAdmin);
        Task<GenericResponse<QuotationDTO?>> GetByIdAsync(int id, int currentUserId, bool isAdmin);
        Task<GenericResponse<QuotationDTO>> AddAsync(CreateQuotationDTO model, int salesAgentId, bool isAdmin);
        Task<GenericResponse<QuotationDTO>> UpdateAsync(UpdateQuotationDTO model, int salesAgentId, bool isAdmin);
        Task<GenericResponse<bool>> ChangeStatusAsync(ChangeQuotationStatusDTO model, int currentUserId, bool isAdmin);

        /// <summary>Sends a draft quotation to the customer (Draft -> Sent).</summary>
        Task<GenericResponse<bool>> SendAsync(int id, int currentUserId, bool isAdmin);

        /// <summary>Creates an editable draft revision of an existing quotation.</summary>
        Task<GenericResponse<QuotationDTO>> DuplicateAsync(int id, int salesAgentId, bool isAdmin);

        Task<GenericResponse<QuotationSummaryDTO>> GetSummaryAsync(int? salesAgentId);
        Task<GenericResponse<bool>> DeleteAsync(int id, int currentUserId, bool isAdmin);
        Task<GenericResponse<byte[]>> GeneratePdfAsync(int id, int currentUserId, bool isAdmin);
    }
}
