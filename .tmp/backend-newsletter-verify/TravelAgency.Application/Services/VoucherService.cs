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
    public class VoucherService : IVoucherService
    {
        private readonly IGenericRepository<Voucher> _repository;
        private readonly IGenericRepository<Customer> _customers;
        private readonly IGenericRepository<Flight> _flights;
        private readonly IGenericRepository<Hotel> _hotels;
        private readonly IGenericRepository<Tour> _tours;
        private readonly IGenericRepository<Package> _packages;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<VoucherService> _logger;

        public VoucherService(IGenericRepository<Voucher> repository, IGenericRepository<Customer> customers,
            IGenericRepository<Flight> flights, IGenericRepository<Hotel> hotels, IGenericRepository<Tour> tours,
            IGenericRepository<Package> packages, IUnitOfWork unitOfWork, ILogger<VoucherService> logger)
        {
            _repository = repository; _customers = customers; _flights = flights; _hotels = hotels;
            _tours = tours; _packages = packages; _unitOfWork = unitOfWork; _logger = logger;
        }

        public async Task<GenericResponse<IList<VoucherDTO>>> GetAsync(int userId, bool isAdmin)
        {
            try
            {
                var rows = await _repository.GetAllByAsync(x => isAdmin || x.SalesAgentId == userId, x => x.Customer);
                return GenericResponse<IList<VoucherDTO>>.Success(rows.OrderByDescending(x => x.ServiceDate).Select(Map).ToList());
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Failed to load vouchers for user {UserId}", userId);
                throw;
            }
        }

        public async Task<GenericResponse<VoucherDTO?>> GetByIdAsync(int id, int userId, bool isAdmin)
        {
            try
            {
                var entity = await LoadAsync(id);
                if (entity == null) return GenericResponse<VoucherDTO?>.NotFound("Voucher was not found.");
                if (!CanAccess(entity, userId, isAdmin)) return GenericResponse<VoucherDTO?>.Unauthorized();
                return GenericResponse<VoucherDTO?>.Success(Map(entity));
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Failed to load voucher {VoucherId}", id);
                throw;
            }
        }

        public async Task<GenericResponse<VoucherDTO>> SaveAsync(SaveVoucherDTO model, int userId, bool isAdmin)
        {
            try
            {
                var customer = await _customers.GetByIdAsync(model.CustomerId);
                if (customer == null) return GenericResponse<VoucherDTO>.BadRequest("Customer was not found.");
                if (!isAdmin && customer.AgentId != userId) return GenericResponse<VoucherDTO>.Unauthorized("You can only create vouchers for customers assigned to you.");
                var resolved = await ResolveServiceAsync(model);
                if (resolved.Error != null) return GenericResponse<VoucherDTO>.BadRequest(resolved.Error);
                if (model.ServiceDate == default || (model.EndDate.HasValue && model.EndDate < model.ServiceDate))
                    return GenericResponse<VoucherDTO>.BadRequest("Voucher dates are invalid.");

                Voucher entity;
                if (model.Id > 0)
                {
                    entity = await LoadAsync(model.Id) ?? null!;
                    if (entity == null) return GenericResponse<VoucherDTO>.NotFound("Voucher was not found.");
                    if (!CanAccess(entity, userId, isAdmin)) return GenericResponse<VoucherDTO>.Unauthorized();
                }
                else
                {
                    entity = new Voucher { VoucherNo = $"VCH-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid():N}"[..19], SalesAgentId = userId, CreatedDate = DateTime.UtcNow };
                    await _repository.AddAsync(entity);
                }

                entity.CustomerId = model.CustomerId; entity.ServiceType = model.ServiceType; entity.ServiceName = resolved.Name!;
                entity.ServiceDate = model.ServiceDate; entity.EndDate = model.EndDate; entity.FlightId = model.FlightId;
                entity.HotelId = model.HotelId; entity.TourId = model.TourId; entity.PackageId = model.PackageId; entity.UpdatedDate = DateTime.UtcNow;
                if (model.Id > 0) await _repository.UpdateAsync(entity);
                if (!await _unitOfWork.CommitAsync()) return GenericResponse<VoucherDTO>.Failure("Failed to save voucher.");
                var saved = await LoadAsync(entity.Id);
                _logger.LogInformation("Voucher {VoucherNo} saved by user {UserId}", entity.VoucherNo, userId);
                return GenericResponse<VoucherDTO>.Success(Map(saved!), "Voucher saved successfully.");
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Failed to save voucher {VoucherId}", model.Id);
                throw;
            }
        }

        public async Task<GenericResponse<bool>> DeleteAsync(int id, int userId, bool isAdmin)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null) return GenericResponse<bool>.NotFound("Voucher was not found.");
                if (!CanAccess(entity, userId, isAdmin)) return GenericResponse<bool>.Unauthorized();
                await _repository.DeleteAsync(entity);
                return await _unitOfWork.CommitAsync() ? GenericResponse<bool>.Success(true) : GenericResponse<bool>.Failure("Failed to delete voucher.");
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Failed to delete voucher {VoucherId}", id);
                throw;
            }
        }

        public async Task<GenericResponse<byte[]>> GeneratePdfAsync(int id, int userId, bool isAdmin)
        {
            try
            {
                var result = await GetByIdAsync(id, userId, isAdmin);
                if (!result.IsSuccess || result.Data == null) return GenericResponse<byte[]>.NotFound(result.Message ?? "Voucher was not found.");
                return GenericResponse<byte[]>.Success(new VoucherPdfDocument(result.Data).GeneratePdf());
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Failed to generate voucher PDF {VoucherId}", id);
                throw;
            }
        }

        private async Task<(string? Name, string? Error)> ResolveServiceAsync(SaveVoucherDTO model)
        {
            var count = new int?[] { model.FlightId, model.HotelId, model.TourId, model.PackageId }.Count(x => x.HasValue);
            if (count != 1) return (null, "Select exactly one flight, hotel, tour, or package.");
            switch (model.ServiceType)
            {
                case VoucherServiceTypeEnum.Flight when model.FlightId.HasValue:
                    var flight = await _flights.GetByIdAsync(model.FlightId.Value);
                    return flight == null ? (null, "Flight was not found.") : ($"{flight.FlightNumber}: {flight.DepartureAirport} - {flight.ArrivalAirport}", null);
                case VoucherServiceTypeEnum.Hotel when model.HotelId.HasValue:
                    var hotel = await _hotels.GetByIdAsync(model.HotelId.Value);
                    return hotel == null ? (null, "Hotel was not found.") : (hotel.Name, null);
                case VoucherServiceTypeEnum.Tour when model.TourId.HasValue:
                    var tour = await _tours.GetByIdAsync(model.TourId.Value);
                    return tour == null ? (null, "Tour was not found.") : (tour.TitleEng, null);
                case VoucherServiceTypeEnum.Package when model.PackageId.HasValue:
                    var package = await _packages.GetByIdAsync(model.PackageId.Value);
                    return package == null ? (null, "Package was not found.") : (package.NameEng, null);
                default: return (null, "The selected service does not match its voucher type.");
            }
        }

        private async Task<Voucher?> LoadAsync(int id) => await _repository.GetByAsync(x => x.Id == id, x => x.Customer);
        private static bool CanAccess(Voucher entity, int userId, bool isAdmin) => isAdmin || entity.SalesAgentId == userId;
        private static VoucherDTO Map(Voucher x) => new()
        {
            Id = x.Id, VoucherNo = x.VoucherNo, CustomerId = x.CustomerId,
            CustomerName = x.Customer.CompanyName ?? $"{x.Customer.FirstName} {x.Customer.LastName}".Trim(), CustomerNumber = x.Customer.Mobile,
            ServiceType = x.ServiceType, ServiceName = x.ServiceName, ServiceDate = x.ServiceDate, EndDate = x.EndDate,
            FlightId = x.FlightId, HotelId = x.HotelId, TourId = x.TourId, PackageId = x.PackageId
        };
    }
}
