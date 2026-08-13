using Microsoft.Extensions.Logging;
using QuestPDF.Fluent;
using TravelAgency.Application.DTOs.CrmDocuments;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Application.Pdf;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Enums;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.Application.Services
{
    public class InvoiceService : IInvoiceService
    {
        private readonly IGenericRepository<Invoice> _repository;
        private readonly IGenericRepository<Customer> _customers;
        private readonly IGenericRepository<Currency> _currencies;
        private readonly IGenericRepository<Tour> _tours;
        private readonly IGenericRepository<Package> _packages;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<InvoiceService> _logger;

        public InvoiceService(IGenericRepository<Invoice> repository, IGenericRepository<Customer> customers,
            IGenericRepository<Currency> currencies, IGenericRepository<Tour> tours,
            IGenericRepository<Package> packages, IUnitOfWork unitOfWork, ILogger<InvoiceService> logger)
        {
            _repository = repository;
            _customers = customers;
            _currencies = currencies;
            _tours = tours;
            _packages = packages;
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        public async Task<GenericResponse<IList<InvoiceDTO>>> GetAsync(int userId, bool isAdmin)
        {
            try
            {
                var rows = await _repository.GetAllByAsync(x => isAdmin || x.SalesAgentId == userId,
                    x => x.Customer, x => x.Currency, x => x.Items);
                return GenericResponse<IList<InvoiceDTO>>.Success(rows.OrderByDescending(x => x.InvoiceDate).Select(Map).ToList());
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Failed to load invoices for user {UserId}", userId);
                throw;
            }
        }

        public async Task<GenericResponse<InvoiceDTO?>> GetByIdAsync(int id, int userId, bool isAdmin)
        {
            try
            {
                var entity = await LoadAsync(id);
                if (entity == null) return GenericResponse<InvoiceDTO?>.NotFound("Invoice was not found.");
                if (!CanAccess(entity, userId, isAdmin)) return GenericResponse<InvoiceDTO?>.Unauthorized();
                return GenericResponse<InvoiceDTO?>.Success(Map(entity));
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Failed to load invoice {InvoiceId}", id);
                throw;
            }
        }

        public async Task<GenericResponse<InvoiceDTO>> SaveAsync(SaveInvoiceDTO model, int userId, bool isAdmin)
        {
            try
            {
                var errors = await ValidateAsync(model, userId, isAdmin);
                if (errors.Count > 0) return GenericResponse<InvoiceDTO>.BadRequest("Invalid invoice data.", errors);

                Invoice entity;
                if (model.Id > 0)
                {
                    entity = await _repository.GetByIdAsync(model.Id) ?? null!;
                    if (entity == null) return GenericResponse<InvoiceDTO>.NotFound("Invoice was not found.");
                    if (!CanAccess(entity, userId, isAdmin)) return GenericResponse<InvoiceDTO>.Unauthorized();
                    var currentItems = (await _repository.GetByAsync(x => x.Id == model.Id, x => x.Items))?.Items.ToList() ?? new List<InvoiceItem>();
                    entity.Items = currentItems;
                    entity.Items.Clear();
                }
                else
                {
                    entity = new Invoice { InvoiceNo = $"INV-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid():N}"[..19], SalesAgentId = userId, CreatedDate = DateTime.UtcNow };
                    await _repository.AddAsync(entity);
                }

                entity.CustomerId = model.CustomerId;
                entity.CurrencyId = model.CurrencyId;
                entity.InvoiceDate = model.InvoiceDate;
                entity.DueDate = model.DueDate;
                entity.Discount = model.Discount;
                entity.TaxRate = model.TaxRate;
                entity.Notes = model.Notes;
                entity.UpdatedDate = DateTime.UtcNow;
                entity.Items = model.Items.Select((item, index) => new InvoiceItem
                {
                    ItemType = item.ItemType,
                    Description = item.Description.Trim(),
                    Quantity = item.Quantity,
                    UnitPrice = item.UnitPrice,
                    Discount = item.Discount,
                    Total = decimal.Round(Math.Max(0, item.UnitPrice * item.Quantity - item.Discount), 2),
                    SortOrder = item.SortOrder > 0 ? item.SortOrder : index + 1,
                    PackageId = item.PackageId,
                    TourId = item.TourId
                }).ToList();
                ApplyTotals(entity);
                if (model.Id > 0) await _repository.UpdateAsync(entity);
                if (!await _unitOfWork.CommitAsync()) return GenericResponse<InvoiceDTO>.Failure("Failed to save invoice.");

                var saved = await LoadAsync(entity.Id);
                _logger.LogInformation("Invoice {InvoiceNo} saved by user {UserId}", entity.InvoiceNo, userId);
                return GenericResponse<InvoiceDTO>.Success(Map(saved!), "Invoice saved successfully.");
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Failed to save invoice {InvoiceId}", model.Id);
                throw;
            }
        }

        public async Task<GenericResponse<bool>> DeleteAsync(int id, int userId, bool isAdmin)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null) return GenericResponse<bool>.NotFound("Invoice was not found.");
                if (!CanAccess(entity, userId, isAdmin)) return GenericResponse<bool>.Unauthorized();
                await _repository.DeleteAsync(entity);
                return await _unitOfWork.CommitAsync() ? GenericResponse<bool>.Success(true) : GenericResponse<bool>.Failure("Failed to delete invoice.");
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Failed to delete invoice {InvoiceId}", id);
                throw;
            }
        }

        public async Task<GenericResponse<byte[]>> GeneratePdfAsync(int id, int userId, bool isAdmin)
        {
            try
            {
                var result = await GetByIdAsync(id, userId, isAdmin);
                if (!result.IsSuccess || result.Data == null) return GenericResponse<byte[]>.NotFound(result.Message ?? "Invoice was not found.");
                return GenericResponse<byte[]>.Success(new InvoicePdfDocument(result.Data).GeneratePdf());
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Failed to generate invoice PDF {InvoiceId}", id);
                throw;
            }
        }

        private async Task<List<string>> ValidateAsync(SaveInvoiceDTO model, int userId, bool isAdmin)
        {
            var errors = new List<string>();
            var customer = await _customers.GetByIdAsync(model.CustomerId);
            if (customer == null) errors.Add("Customer was not found.");
            else if (!isAdmin && customer.AgentId != userId) errors.Add("You can only invoice customers assigned to you.");
            if (await _currencies.GetByIdAsync(model.CurrencyId) == null) errors.Add("Currency was not found.");
            if (model.InvoiceDate == default || model.DueDate < model.InvoiceDate) errors.Add("Due date must be on or after the invoice date.");
            if (model.Discount < 0 || model.TaxRate < 0) errors.Add("Invoice discount and tax rate cannot be negative.");
            if (model.Items.Count == 0) errors.Add("Add at least one tour or package.");
            foreach (var item in model.Items)
            {
                if (item.Quantity < 1 || item.UnitPrice < 0 || item.Discount < 0 || item.Discount > item.UnitPrice * item.Quantity)
                    errors.Add("Each invoice line requires a valid quantity, price, and discount.");
                if (item.ItemType == QuotationItemTypeEnum.Tour)
                {
                    if (!item.TourId.HasValue || item.PackageId.HasValue || await _tours.GetByIdAsync(item.TourId ?? 0) == null) errors.Add("A tour invoice line must reference one valid tour.");
                }
                else if (item.ItemType == QuotationItemTypeEnum.Package)
                {
                    if (!item.PackageId.HasValue || item.TourId.HasValue || await _packages.GetByIdAsync(item.PackageId ?? 0) == null) errors.Add("A package invoice line must reference one valid package.");
                }
                else errors.Add("Invoices can contain tours and packages only.");
            }
            return errors.Distinct().ToList();
        }

        private async Task<Invoice?> LoadAsync(int id) => await _repository.GetByAsync(x => x.Id == id, x => x.Customer, x => x.Currency, x => x.Items);
        private static bool CanAccess(Invoice entity, int userId, bool isAdmin) => isAdmin || entity.SalesAgentId == userId;
        private static void ApplyTotals(Invoice entity)
        {
            entity.SubTotal = decimal.Round(entity.Items.Sum(x => x.Total), 2);
            entity.Discount = Math.Min(entity.Discount, entity.SubTotal);
            var taxable = entity.SubTotal - entity.Discount;
            entity.Tax = decimal.Round(taxable * entity.TaxRate / 100m, 2);
            entity.TotalAmount = taxable + entity.Tax;
        }
        private static InvoiceDTO Map(Invoice x) => new()
        {
            Id = x.Id, InvoiceNo = x.InvoiceNo, CustomerId = x.CustomerId,
            CustomerName = x.Customer.CompanyName ?? $"{x.Customer.FirstName} {x.Customer.LastName}".Trim(), CustomerNumber = x.Customer.Mobile,
            CurrencyId = x.CurrencyId, CurrencySign = x.Currency.Sign, InvoiceDate = x.InvoiceDate, DueDate = x.DueDate,
            SubTotal = x.SubTotal, Discount = x.Discount, TaxRate = x.TaxRate, Tax = x.Tax, TotalAmount = x.TotalAmount, Notes = x.Notes,
            Items = x.Items.OrderBy(i => i.SortOrder).Select(i => new InvoiceItemDTO { Id = i.Id, ItemType = i.ItemType, Description = i.Description, Quantity = i.Quantity, UnitPrice = i.UnitPrice, Discount = i.Discount, Total = i.Total, SortOrder = i.SortOrder, PackageId = i.PackageId, TourId = i.TourId }).ToList()
        };
    }
}
