using TravelAgency.Application.DTOs.CrmDocuments;
using TravelAgency.Application.DTOs.User;

namespace TravelAgency.Application.Interfaces
{
    public interface IInvoiceService
    {
        Task<GenericResponse<IList<InvoiceDTO>>> GetAsync(int userId, bool isAdmin);
        Task<GenericResponse<InvoiceDTO?>> GetByIdAsync(int id, int userId, bool isAdmin);
        Task<GenericResponse<InvoiceDTO>> SaveAsync(SaveInvoiceDTO model, int userId, bool isAdmin);
        Task<GenericResponse<bool>> DeleteAsync(int id, int userId, bool isAdmin);
        Task<GenericResponse<byte[]>> GeneratePdfAsync(int id, int userId, bool isAdmin);
    }

    public interface IVoucherService
    {
        Task<GenericResponse<IList<VoucherDTO>>> GetAsync(int userId, bool isAdmin);
        Task<GenericResponse<VoucherDTO?>> GetByIdAsync(int id, int userId, bool isAdmin);
        Task<GenericResponse<VoucherDTO>> SaveAsync(SaveVoucherDTO model, int userId, bool isAdmin);
        Task<GenericResponse<bool>> DeleteAsync(int id, int userId, bool isAdmin);
        Task<GenericResponse<byte[]>> GeneratePdfAsync(int id, int userId, bool isAdmin);
    }
}
