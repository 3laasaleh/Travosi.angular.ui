using AutoMapper;
using FluentValidation;
using Microsoft.Extensions.Logging;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using TravelAgency.Application.DTOs.Bookings;
using TravelAgency.Application.DTOs.Crm;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Enums;
using TravelAgency.Domain.Models;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.Application.Services
{
    public class BookingService : IBookingService
    {
        private readonly IUnitOfWork _uk;
        private readonly IGenericRepository<Booking> _repository;
        private readonly IGenericRepository<Tour> _tourRepository;
        private readonly IGenericRepository<Package> _packageRepository;
        private readonly IGenericRepository<User> _userRepository;
        private readonly IGenericRepository<Customer> _customerRepository;
        private readonly INotificationService _notificationService;
        private readonly IMapper _mapper;
        private readonly ILogger<BookingService> _logger;
        private readonly IValidator<CreateBookingDTO> _createValidator;
        private readonly IValidator<UpdateBookingDTO> _updateValidator;

        public BookingService(
            IUnitOfWork uk,
            IGenericRepository<Booking> repository,
            IGenericRepository<Tour> tourRepository,
            IGenericRepository<Package> packageRepository,
            IGenericRepository<User> userRepository,
            IGenericRepository<Customer> customerRepository,
            INotificationService notificationService,
            IMapper mapper,
            ILogger<BookingService> logger,
            IValidator<CreateBookingDTO> createValidator,
            IValidator<UpdateBookingDTO> updateValidator)
        {
            _uk = uk;
            _repository = repository;
            _tourRepository = tourRepository;
            _packageRepository = packageRepository;
            _userRepository = userRepository;
            _customerRepository = customerRepository;
            _notificationService = notificationService;
            _mapper = mapper;
            _logger = logger;
            _createValidator = createValidator;
            _updateValidator = updateValidator;
        }
        public async Task<GenericResponse<PaginationModel<BookingDTO>>> GetByAgentAsync(int pageNumber, int pageSize, int agentId, BookingStatusEnum? status = null) {
            try
            {
                var d = await _repository.GetPaggingByIncludeAsync(
                    pageNumber,
                    pageSize,
      
                    s => s.AgentId == agentId && (!status.HasValue || s.Status == status.Value),
                    c => c.User!, c => c.Agent!, c => c.Tour!, c => c.Package!);
                var res = new PaginationModel<BookingDTO>
                {
                    Data = _mapper.Map<List<BookingDTO>>(d.Data),
                    Page = d.Page,
                    PageSize = d.PageSize,
                    TotalCount = d.TotalCount
                };
                return GenericResponse<PaginationModel<BookingDTO>>.Success(res);

            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(BookingService), nameof(GetByAgentAsync));
                throw;
            }
        }
        public async Task<GenericResponse<PaginationModel<BookingDTO>>> GetAllAsync(int pageNumber, int pageSize, BookingStatusEnum? status = null)
        {
            try
            {
                var d = await _repository.GetPaggingByIncludeAsync(
                    pageNumber,
                    pageSize,
                    status.HasValue ? s => s.Status == status.Value : null,
                    c => c.User!, c => c.Agent!, c => c.Tour!, c => c.Package!);
                var res = new PaginationModel<BookingDTO>
                {
                    Data = _mapper.Map<List<BookingDTO>>(d.Data),
                    Page = d.Page,
                    PageSize = d.PageSize,
                    TotalCount = d.TotalCount
                };
                return GenericResponse<PaginationModel<BookingDTO>>.Success(res);
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(BookingService), nameof(GetAllAsync));
                throw;
            }
        }

        public async Task<GenericResponse<PaginationModel<BookingDTO>>> GetByUserAsync(int pageNumber, int pageSize, int userId)
        {
            try
            {
                var d = await _repository.GetPaggingByIncludeAsync(pageNumber, pageSize, s => s.UserId == userId, c => c.User!, c => c.Agent!, c => c.Tour!, c => c.Package!);
                var res = new PaginationModel<BookingDTO>
                {
                    Data = _mapper.Map<List<BookingDTO>>(d.Data),
                    Page = d.Page,
                    PageSize = d.PageSize,
                    TotalCount = d.TotalCount
                };
                return GenericResponse<PaginationModel<BookingDTO>>.Success(res);
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(BookingService), nameof(GetByUserAsync));
                throw;
            }
        }

        public async Task<GenericResponse<IList<BookingDTO>>> GetListByUserAsync(int userId)
        {
            try
            {
                var bookings = await _repository.GetAllByAsync(s => s.UserId == userId, c => c.User!, c => c.Tour!, c => c.Package!, c => c.Agent!);
                var ordered = bookings.OrderByDescending(b => b.CreatedDate).ToList();
                return GenericResponse<IList<BookingDTO>>.Success(_mapper.Map<IList<BookingDTO>>(ordered));
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(BookingService), nameof(GetListByUserAsync));
                throw;
            }
        }

        public async Task<GenericResponse<BookingDTO?>> GetByIdAsync(int id)
        {
            try
            {
                var booking = await _repository.GetByAsync(b => b.Id == id, b => b.User!, b => b.Tour!, b => b.Package!, b => b.Agent!);
                if (booking == null)
                    return GenericResponse<BookingDTO?>.NotFound($"Booking with id {id} was not found.");

                return GenericResponse<BookingDTO?>.Success(_mapper.Map<BookingDTO>(booking));
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(BookingService), nameof(GetByIdAsync));
                throw;
            }
        }

        public async Task<GenericResponse<BookingDTO>> AddAsync(CreateBookingDTO model, int userId)
        {
            try
            {
                NormalizeCreateModel(model);

                var validation = await _createValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<BookingDTO>.BadRequest("Invalid booking data.", validation.Errors.Select(e => e.ErrorMessage));

                Tour? tour = null;
                Package? package = null;

                if (model.TourId.HasValue)
                {
                    tour = await _tourRepository.GetByIdAsync(model.TourId.Value);
                    if (tour == null)
                        return GenericResponse<BookingDTO>.BadRequest($"Tour with id {model.TourId} was not found.");

                    if (!tour.IsActive)
                        return GenericResponse<BookingDTO>.BadRequest("This tour is not available for booking.");

                    if (tour.SeatsAvailable < model.NumberOfTravelers)
                        return GenericResponse<BookingDTO>.BadRequest($"Only {tour.SeatsAvailable} seats are available.");
                }

                if (model.PackageId.HasValue)
                {
                    package = await _packageRepository.GetByIdAsync(model.PackageId.Value);
                    if (package == null)
                        return GenericResponse<BookingDTO>.BadRequest($"Package with id {model.PackageId} was not found.");

                    if (!package.IsActive)
                        return GenericResponse<BookingDTO>.BadRequest("This package is not available for booking.");

                    var packageSeatsAvailable = GetPackageSeatsAvailable(package);
                    if (packageSeatsAvailable < model.NumberOfTravelers)
                        return GenericResponse<BookingDTO>.BadRequest($"Only {packageSeatsAvailable} package seats are available.");
                }

                var dateError = ValidateTravelDates(model.DateFrom, model.DateTo, tour, package);
                if (dateError != null)
                    return GenericResponse<BookingDTO>.BadRequest(dateError);

                var duplicateBooking = await _repository.GetByAsync(booking =>
                    booking.UserId == userId &&
                    booking.TourId == model.TourId &&
                    booking.PackageId == model.PackageId &&
                    booking.DateFrom.Date == model.DateFrom.Date &&
                    booking.DateTo.Date == model.DateTo.Date);
                if (duplicateBooking != null)
                    return GenericResponse<BookingDTO>.BadRequest(
                        "You already have a booking for this tour or package with the same dates.");

                var entity = _mapper.Map<Booking>(model);
                entity.UserId = userId;
                entity.Status = BookingStatusEnum.Pending;
                entity.CreatedDate = DateTime.UtcNow;
                entity.UpdatedDate = null;
                entity.AgentId = null;
                entity.TotalPrice = model.Adults.HasValue
                    ? CalculateTotalPrice(tour, package, model.Adults.Value, model.Children ?? 0)
                    : CalculateTotalPrice(tour, package, model.NumberOfTravelers);
                await _repository.AddAsync(entity);
                bool saved;
                try
                {
                    saved = await _uk.CommitAsync();
                }
                catch (Exception exception)
                {
                    _logger.LogError(
                        exception,
                        "Booking creation commit failed for user {UserId}; checking for a concurrent duplicate booking",
                        userId);
                    var concurrentDuplicate = await _repository.GetByAsync(booking =>
                        booking.UserId == userId &&
                        booking.TourId == model.TourId &&
                        booking.PackageId == model.PackageId &&
                        booking.DateFrom == model.DateFrom &&
                        booking.DateTo == model.DateTo);
                    if (concurrentDuplicate != null)
                        return GenericResponse<BookingDTO>.BadRequest(
                            "You already have a booking for this tour or package with the same dates.");

                    throw;
                }
                if (!saved)
                    return GenericResponse<BookingDTO>.Failure("Failed to create booking.");

                _logger.LogInformation("Booking {Id} created by user {UserId} with Pending status", entity.Id, userId);

                return GenericResponse<BookingDTO>.Success(_mapper.Map<BookingDTO>(entity),
                    "Booking created successfully and is pending admin confirmation.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(BookingService), nameof(AddAsync));
                throw;
            }
        }

        public async Task<GenericResponse<BookingDTO>> UpdateAsync(UpdateBookingDTO model, int userId)
        {
            try
            {
                model.DateFrom = model.DateFrom.Date;
                model.DateTo = model.DateTo.Date;

                var validation = await _updateValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<BookingDTO>.BadRequest("Invalid booking data.", validation.Errors.Select(e => e.ErrorMessage));

                var entity = await _repository.GetByIdAsync(model.Id);
                if (entity == null)
                    return GenericResponse<BookingDTO>.NotFound($"Booking with id {model.Id} was not found.");

                if (entity.Status != BookingStatusEnum.Pending)
                    return GenericResponse<BookingDTO>.BadRequest("Only pending bookings can be updated.");

                var tour = entity.TourId.HasValue ? await _tourRepository.GetByIdAsync(entity.TourId.Value) : null;
                var package = entity.PackageId.HasValue ? await _packageRepository.GetByIdAsync(entity.PackageId.Value) : null;

                if (tour != null && tour.SeatsAvailable < model.NumberOfTravelers)
                    return GenericResponse<BookingDTO>.BadRequest($"Only {tour.SeatsAvailable} seats are available.");

                if (package != null)
                {
                    var packageSeatsAvailable = GetPackageSeatsAvailable(package);
                    if (packageSeatsAvailable < model.NumberOfTravelers)
                        return GenericResponse<BookingDTO>.BadRequest($"Only {packageSeatsAvailable} package seats are available.");
                }

                var dateError = ValidateTravelDates(model.DateFrom, model.DateTo, tour, package);
                if (dateError != null)
                    return GenericResponse<BookingDTO>.BadRequest(dateError);

                var duplicateBooking = await _repository.GetByAsync(booking =>
                    booking.Id != entity.Id &&
                    booking.UserId == entity.UserId &&
                    booking.TourId == entity.TourId &&
                    booking.PackageId == entity.PackageId &&
                    booking.DateFrom.Date == model.DateFrom.Date &&
                    booking.DateTo.Date == model.DateTo.Date);
                if (duplicateBooking != null)
                    return GenericResponse<BookingDTO>.BadRequest(
                        "This customer already has a booking for this tour or package with the same dates.");

                entity.NumberOfTravelers = model.NumberOfTravelers;
                entity.SpecialRequests = model.SpecialRequests;
                entity.DateFrom = model.DateFrom;
                entity.DateTo = model.DateTo;
                entity.TotalPrice = CalculateTotalPrice(tour, package, model.NumberOfTravelers);
                entity.UpdatedDate = DateTime.UtcNow;
                entity.AgentId = userId;

                await _repository.UpdateAsync(entity);
                await _uk.CommitAsync();
                return GenericResponse<BookingDTO>.Success(_mapper.Map<BookingDTO>(entity), "Booking updated successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(BookingService), nameof(UpdateAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> ChangeStatusAsync(int id, ChangeBookingStatusByIdDTO model, int userId, bool isAdmin)
        {
            try
            {
                if (!Enum.IsDefined(typeof(BookingStatusEnum), model.Status) || model.Status == BookingStatusEnum.Pending)
                    return GenericResponse<bool>.BadRequest("Booking status can only be moved out of Pending.");

                if (model.CancellationFeeAmount < 0)
                    return GenericResponse<bool>.BadRequest("Cancellation fee cannot be negative.");

                if (model.Note?.Length > 1000)
                    return GenericResponse<bool>.BadRequest("Status note cannot exceed 1000 characters.");

                var entity = await _repository.GetByAsync(b => b.Id == id, b => b.Tour!, b => b.Package!);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Booking with id {id} was not found.");

                if (!isAdmin && entity.AgentId != userId)
                    return GenericResponse<bool>.Unauthorized("You can only update bookings assigned to you.");

                if (entity.Status == model.Status)
                    return GenericResponse<bool>.BadRequest($"Booking is already {entity.Status}.");

                if (!IsValidTransition(entity.Status, model.Status))
                    return GenericResponse<bool>.BadRequest($"Booking cannot change from {entity.Status} to {model.Status}.");

                var now = DateTime.UtcNow;
                var wasConfirmed = entity.Status == BookingStatusEnum.Confirmed;

                if (model.Status == BookingStatusEnum.Confirmed)
                {
                    if (!model.CustomerContacted)
                        return GenericResponse<bool>.BadRequest("Confirm that the customer was contacted by phone before confirming the booking.");

                    if (entity.Tour != null)
                    {
                        if (entity.Tour.SeatsAvailable < entity.NumberOfTravelers)
                            return GenericResponse<bool>.BadRequest($"Only {entity.Tour.SeatsAvailable} seats are available.");

                        entity.Tour.SeatsBooked += entity.NumberOfTravelers;
                    }
                    else if (entity.Package != null)
                    {
                        var packageSeatsAvailable = GetPackageSeatsAvailable(entity.Package);
                        if (packageSeatsAvailable < entity.NumberOfTravelers)
                            return GenericResponse<bool>.BadRequest($"Only {packageSeatsAvailable} package seats are available.");

                        entity.Package.SeatsBooked += entity.NumberOfTravelers;
                    }

                    entity.CustomerContactedAt = now;
                    entity.ConfirmedDate = now;
                    entity.CancellationFeeAmount = 0;
                }

                if (model.Status == BookingStatusEnum.Cancelled)
                {
                    var isFreeCancellation = entity.Tour?.IsFreeCancelation
                        ?? entity.Package?.IsFreeCancelation
                        ?? true;
                    var cancellationFee = entity.Status == BookingStatusEnum.Pending || isFreeCancellation
                        ? 0
                        : model.CancellationFeeAmount ?? 0;

                    if (cancellationFee > entity.TotalPrice)
                        return GenericResponse<bool>.BadRequest("Cancellation fee cannot exceed the booking total.");

                    if (wasConfirmed && entity.Tour != null)
                    {
                        entity.Tour.SeatsBooked = Math.Max(0, entity.Tour.SeatsBooked - entity.NumberOfTravelers);
                    }
                    else if (wasConfirmed && entity.Package != null)
                    {
                        entity.Package.SeatsBooked = Math.Max(0, entity.Package.SeatsBooked - entity.NumberOfTravelers);
                    }

                    entity.CancellationFeeAmount = cancellationFee;
                    entity.CancelledDate = now;
                }

                entity.Status = model.Status;
                entity.StatusNote = string.IsNullOrWhiteSpace(model.Note) ? null : model.Note.Trim();
                entity.UpdatedDate = now;
                entity.AgentId ??= userId;

                await _repository.UpdateAsync(entity);
                await _uk.CommitAsync();
                _logger.LogInformation("Booking {Id} status changed to {Status} by user {UserId}", entity.Id, entity.Status, userId);

                return GenericResponse<bool>.Success(true, $"Booking status changed to {entity.Status}.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(BookingService), nameof(ChangeStatusAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> AssignAgentAsync(int bookingId, int agentId, int adminId)
        {
            try
            {
                var agent = await _userRepository.GetByIdAsync(agentId);
                if (agent == null)
                    return GenericResponse<bool>.BadRequest($"Agent with id {agentId} was not found.");

                if (agent.Role != UserRoleEnum.Agent)
                    return GenericResponse<bool>.BadRequest("Bookings can only be assigned to users with the Agent role.");

                if (!agent.IsActivated)
                    return GenericResponse<bool>.BadRequest("Bookings can only be assigned to active agents.");

                var entity = await _repository.GetByAsync(b => b.Id == bookingId, b => b.User!);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Booking with id {bookingId} was not found.");

                entity.AgentId = agentId;
                entity.UpdatedDate = DateTime.UtcNow;
                await _repository.UpdateAsync(entity);
                // Hand the booking's customer to the same agent when a CRM record matches.
                if (!string.IsNullOrWhiteSpace(entity.User?.Email))
                {
                    var email = entity.User.Email.ToLower();
                    var customer = await _customerRepository.GetByAsync(c => c.Email.ToLower() == email);
                    if (customer != null && customer.AgentId != agentId)
                    {
                        customer.AgentId = agentId;
                        await _customerRepository.UpdateAsync(customer);
                    }
                }

                await _notificationService.CreateAsync(
                    agentId,
                    "Booking assigned",
                    $"Booking #{entity.Id} has been assigned to you.",
                    NotificationTypeEnum.TaskAssigned,
                    entity.Id);
               if (!await _uk.CommitAsync())
                    return GenericResponse<bool>.Failure("Failed to assign booking to agent.");

                _logger.LogInformation("Booking {Id} assigned to agent {AgentId} by admin {AdminId}", entity.Id, agentId, adminId);

                return GenericResponse<bool>.Success(true, "Booking assigned and agent notified successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(BookingService), nameof(AssignAgentAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> DeleteAsync(int id)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Booking with id {id} was not found.");

                if (entity.Status == BookingStatusEnum.Confirmed || entity.Status == BookingStatusEnum.Completed)
                    return GenericResponse<bool>.BadRequest("Confirmations must be cancelled before the booking can be deleted.");

                await _repository.DeleteAsync(entity);
                if (!await _uk.CommitAsync())
                    return GenericResponse<bool>.Failure("Failed to delete booking.");
                return GenericResponse<bool>.Success(true, "Booking deleted successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(BookingService), nameof(DeleteAsync));
                throw;
            }
        }

        private static void NormalizeCreateModel(CreateBookingDTO model)
        {
            if (model.Adults.HasValue || model.Children.HasValue)
                model.NumberOfTravelers = (model.Adults ?? 0) + (model.Children ?? 0);

            if (model.DateFrom == default && model.TravelDate.HasValue)
                model.DateFrom = model.TravelDate.Value;

            if (model.DateTo == default)
                model.DateTo = model.DateFrom;

            model.DateFrom = model.DateFrom.Date;
            model.DateTo = model.DateTo.Date;

            model.SpecialRequests ??= model.Notes;
        }

        private static decimal CalculateTotalPrice(Tour? tour, Package? package, int numberOfTravelers)
        {
            var pricePerPerson = tour?.PricePerPerson ?? package?.PricePerPerson ?? 0;
            return pricePerPerson * numberOfTravelers;
        }

        private static decimal CalculateTotalPrice(Tour? tour, Package? package, int adults, int children)
        {
            var pricePerPerson = tour?.PricePerPerson ?? package?.PricePerPerson ?? 0;
            var pricePerChild = tour?.PricePerChild ?? package?.PricePerChild ?? pricePerPerson;
            return pricePerPerson * adults + pricePerChild * children;
        }

        private static int GetPackageSeatsAvailable(Package package) => package.SeatsAvailable;

        private static bool IsValidTransition(BookingStatusEnum current, BookingStatusEnum next) =>
            current switch
            {
                BookingStatusEnum.Pending => next is BookingStatusEnum.Confirmed or BookingStatusEnum.Cancelled,
                BookingStatusEnum.Confirmed => next is BookingStatusEnum.Completed or BookingStatusEnum.Cancelled,
                _ => false
            };

        private static string? ValidateTravelDates(DateTime dateFrom, DateTime dateTo, Tour? tour, Package? package)
        {
            if (dateFrom.Date < DateTime.UtcNow.Date)
                return "Travel date cannot be in the past.";

            var productStart = tour?.StartDate ?? package?.DateFrom ?? default;
            var productEnd = tour?.EndDate ?? package?.DateTo ?? default;

            if (productStart != default && dateFrom.Date < productStart.Date)
                return $"Travel date must be on or after {productStart:yyyy-MM-dd}.";

            if (productEnd != default && dateTo.Date > productEnd.Date)
                return $"Travel date must be on or before {productEnd:yyyy-MM-dd}.";

            return null;
        }
    }
}
