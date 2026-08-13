using AutoMapper;
using FluentValidation;
using Microsoft.Extensions.Logging;
using QuestPDF.Fluent;
using TravelAgency.Application.DTOs.Quotations;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Application.Pdf;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Enums;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.Application.Services
{
    public class QuotationService : IQuotationService
    {
        private readonly IUnitOfWork _uk;
        private readonly IGenericRepository<Quotation> _repository;
        private readonly IGenericRepository<QuotationItem> _itemRepository;
        private readonly IGenericRepository<Customer> _customerRepository;
        private readonly IGenericRepository<Currency> _currencyRepository;
        private readonly IGenericRepository<Package> _packageRepository;
        private readonly IGenericRepository<Tour> _tourRepository;
        private readonly IGenericRepository<Hotel> _hotelRepository;
        private readonly IGenericRepository<Flight> _flightRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<QuotationService> _logger;
        private readonly IValidator<CreateQuotationDTO> _createValidator;
        private readonly IValidator<UpdateQuotationDTO> _updateValidator;
        private readonly IValidator<ChangeQuotationStatusDTO> _changeStatusValidator;

        /// <summary>Allowed quotation status transitions.</summary>
        private static readonly Dictionary<QuotationStatusEnum, QuotationStatusEnum[]> AllowedTransitions = new()
        {
            [QuotationStatusEnum.Draft] = new[] { QuotationStatusEnum.Sent, QuotationStatusEnum.Cancelled },
            [QuotationStatusEnum.Sent] = new[]
            {
                QuotationStatusEnum.Accepted, QuotationStatusEnum.Rejected,
                QuotationStatusEnum.Expired, QuotationStatusEnum.Cancelled
            },
            [QuotationStatusEnum.Accepted] = Array.Empty<QuotationStatusEnum>(),
            [QuotationStatusEnum.Rejected] = Array.Empty<QuotationStatusEnum>(),
            [QuotationStatusEnum.Expired] = new[] { QuotationStatusEnum.Cancelled },
            [QuotationStatusEnum.Cancelled] = Array.Empty<QuotationStatusEnum>()
        };

        public QuotationService(
            IUnitOfWork unitOfWork,
            IGenericRepository<Quotation> repository,
            IGenericRepository<QuotationItem> itemRepository,
            IGenericRepository<Customer> customerRepository,
            IGenericRepository<Currency> currencyRepository,
            IGenericRepository<Package> packageRepository,
            IGenericRepository<Tour> tourRepository,
            IGenericRepository<Hotel> hotelRepository,
            IGenericRepository<Flight> flightRepository,
            IMapper mapper,
            ILogger<QuotationService> logger,
            IValidator<CreateQuotationDTO> createValidator,
            IValidator<UpdateQuotationDTO> updateValidator,
            IValidator<ChangeQuotationStatusDTO> changeStatusValidator)
        {
            _repository = repository;
            _itemRepository = itemRepository;
            _customerRepository = customerRepository;
            _currencyRepository = currencyRepository;
            _packageRepository = packageRepository;
            _tourRepository = tourRepository;
            _hotelRepository = hotelRepository;
            _flightRepository = flightRepository;
            _mapper = mapper;
            _logger = logger;
            _createValidator = createValidator;
            _updateValidator = updateValidator;
            _changeStatusValidator = changeStatusValidator;
            _uk = unitOfWork;
        }

        public async Task<GenericResponse<IList<QuotationDTO>>> GetAllAsync()
        {
            try
            {
                var quotations = await _repository.GetAllByAsync(
                    q => q.Customer, q => q.SalesAgent!, q => q.Currency, q => q.Items);
                var list = quotations.OrderByDescending(q => q.CreatedDate).ToList();
                await ExpireOverdueAsync(list);
                return GenericResponse<IList<QuotationDTO>>.Success(_mapper.Map<IList<QuotationDTO>>(list));
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(QuotationService), nameof(GetAllAsync));
                throw;
            }
        }

        public async Task<GenericResponse<IList<QuotationDTO>>> GetByAgentAsync(int salesAgentId)
        {
            try
            {
                var quotations = await _repository.GetAllByAsync(
                    q => q.SalesAgentId == salesAgentId,
                    q => q.Customer, q => q.SalesAgent!, q => q.Currency, q => q.Items);
                var list = quotations.OrderByDescending(q => q.CreatedDate).ToList();
                await ExpireOverdueAsync(list);
                return GenericResponse<IList<QuotationDTO>>.Success(_mapper.Map<IList<QuotationDTO>>(list));
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(QuotationService), nameof(GetByAgentAsync));
                throw;
            }
        }

        public async Task<GenericResponse<IList<QuotationDTO>>> GetByCustomerAsync(
            int customerId,
            int currentUserId,
            bool isAdmin)
        {
            try
            {
                var quotations = await _repository.GetAllByAsync(
                    q => q.CustomerId == customerId && (isAdmin || q.SalesAgentId == currentUserId),
                    q => q.Customer, q => q.SalesAgent!, q => q.Currency, q => q.Items);
                var list = quotations.OrderByDescending(q => q.CreatedDate).ToList();
                await ExpireOverdueAsync(list);
                return GenericResponse<IList<QuotationDTO>>.Success(_mapper.Map<IList<QuotationDTO>>(list));
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(QuotationService), nameof(GetByCustomerAsync));
                throw;
            }
        }

        public async Task<GenericResponse<QuotationDTO?>> GetByIdAsync(int id, int currentUserId, bool isAdmin)
        {
            try
            {
                var quotation = await LoadFullAsync(id);
                if (quotation == null)
                    return GenericResponse<QuotationDTO?>.NotFound($"Quotation with id {id} was not found.");

                if (!CanAccess(quotation, currentUserId, isAdmin))
                    return GenericResponse<QuotationDTO?>.Unauthorized("You can only view quotations assigned to you.");

                await ExpireOverdueAsync(new List<Quotation> { quotation });
                return GenericResponse<QuotationDTO?>.Success(_mapper.Map<QuotationDTO>(quotation));
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(QuotationService), nameof(GetByIdAsync));
                throw;
            }
        }

        public async Task<GenericResponse<QuotationDTO>> AddAsync(
            CreateQuotationDTO model,
            int salesAgentId,
            bool isAdmin)
        {
            try
            {
                var validation = await _createValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<QuotationDTO>.BadRequest("Invalid quotation data.", validation.Errors.Select(e => e.ErrorMessage));

                var customer = await _customerRepository.GetByIdAsync(model.CustomerId);
                if (customer == null)
                    return GenericResponse<QuotationDTO>.BadRequest($"Customer with id {model.CustomerId} was not found.");

                if (!isAdmin && customer.AgentId != salesAgentId)
                    return GenericResponse<QuotationDTO>.Unauthorized("You can only create quotations for customers assigned to you.");

                var currency = await _currencyRepository.GetByIdAsync(model.CurrencyId);
                if (currency == null)
                    return GenericResponse<QuotationDTO>.BadRequest($"Currency with id {model.CurrencyId} was not found.");

                var referenceErrors = await ValidateItemReferencesAsync(model.Items);
                if (referenceErrors.Any())
                    return GenericResponse<QuotationDTO>.BadRequest("Invalid quotation line references.", referenceErrors);

                var entity = _mapper.Map<Quotation>(model);
                entity.SalesAgentId = salesAgentId;
                entity.QuotationNo = GenerateQuotationNo();
                entity.Status = QuotationStatusEnum.Draft;
                entity.CreatedDate = DateTime.UtcNow;
                entity.UpdatedDate = DateTime.UtcNow;

                entity.Items = model.Items.Select(BuildItem).ToList();
                ApplyTotals(entity, model.Discount, model.TaxRate);

                await _repository.AddAsync(entity);
                var saved = await _uk.CommitAsync();
                if (!saved)
                    return GenericResponse<QuotationDTO>.Failure("Failed to create quotation.");

                _logger.LogInformation("Quotation {No} created by agent {AgentId}", entity.QuotationNo, salesAgentId);

                var created = await LoadFullAsync(entity.Id);
                return GenericResponse<QuotationDTO>.Success(_mapper.Map<QuotationDTO>(created), "Quotation created successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(QuotationService), nameof(AddAsync));
                throw;
            }
        }

        public async Task<GenericResponse<QuotationDTO>> UpdateAsync(
            UpdateQuotationDTO model,
            int salesAgentId,
            bool isAdmin)
        {
            try
            {
                var validation = await _updateValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<QuotationDTO>.BadRequest("Invalid quotation data.", validation.Errors.Select(e => e.ErrorMessage));

                var entity = await LoadFullAsync(model.Id);
                if (entity == null)
                    return GenericResponse<QuotationDTO>.NotFound($"Quotation with id {model.Id} was not found.");

                if (!CanAccess(entity, salesAgentId, isAdmin))
                    return GenericResponse<QuotationDTO>.Unauthorized("You can only update quotations assigned to you.");

                if (entity.Status != QuotationStatusEnum.Draft)
                    return GenericResponse<QuotationDTO>.BadRequest(
                        $"Only draft quotations can be updated. This quotation is '{entity.Status}'. Duplicate it to create a new revision.");

                var customer = await _customerRepository.GetByIdAsync(model.CustomerId);
                if (customer == null)
                    return GenericResponse<QuotationDTO>.BadRequest($"Customer with id {model.CustomerId} was not found.");

                if (!isAdmin && customer.AgentId != salesAgentId)
                    return GenericResponse<QuotationDTO>.Unauthorized("You can only use customers assigned to you.");

                var currency = await _currencyRepository.GetByIdAsync(model.CurrencyId);
                if (currency == null)
                    return GenericResponse<QuotationDTO>.BadRequest($"Currency with id {model.CurrencyId} was not found.");

                var referenceErrors = await ValidateItemReferencesAsync(model.Items);
                if (referenceErrors.Any())
                    return GenericResponse<QuotationDTO>.BadRequest("Invalid quotation line references.", referenceErrors);

                entity.CustomerId = model.CustomerId;
                entity.CurrencyId = model.CurrencyId;
                entity.TravelStartDate = model.TravelStartDate;
                entity.TravelEndDate = model.TravelEndDate;
                entity.Adults = model.Adults;
                entity.Children = model.Children;
                entity.Infants = model.Infants;
                entity.ExchangeRate = model.ExchangeRate;
                entity.ValidUntil = model.ValidUntil;
                entity.Notes = model.Notes;
                entity.UpdatedDate = DateTime.UtcNow;

                foreach (var existing in entity.Items.ToList())
                    await _itemRepository.DeleteAsync(existing);

                entity.Items = model.Items.Select(BuildItem).ToList();
                ApplyTotals(entity, model.Discount, model.TaxRate);

                await _repository.UpdateAsync(entity);
                var saved = await _uk.CommitAsync();
                if (!saved)
                    return GenericResponse<QuotationDTO>.Failure("Failed to update quotation.");

                var updated = await LoadFullAsync(entity.Id);
                return GenericResponse<QuotationDTO>.Success(_mapper.Map<QuotationDTO>(updated), "Quotation updated successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(QuotationService), nameof(UpdateAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> ChangeStatusAsync(
            ChangeQuotationStatusDTO model,
            int currentUserId,
            bool isAdmin)
        {
            try
            {
                var validation = await _changeStatusValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<bool>.BadRequest("Invalid request.", validation.Errors.Select(e => e.ErrorMessage));

                var entity = await _repository.GetByIdAsync(model.Id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Quotation with id {model.Id} was not found.");

                if (!CanAccess(entity, currentUserId, isAdmin))
                    return GenericResponse<bool>.Unauthorized("You can only change quotations assigned to you.");

                if (entity.Status == model.Status)
                    return GenericResponse<bool>.BadRequest($"Quotation is already '{entity.Status}'.");

                if (!AllowedTransitions.TryGetValue(entity.Status, out var allowed) || !allowed.Contains(model.Status))
                    return GenericResponse<bool>.BadRequest(
                        $"Cannot change a quotation from '{entity.Status}' to '{model.Status}'.");

                // A quotation past its validity date can no longer be accepted by the customer.
                if (model.Status == QuotationStatusEnum.Accepted && IsPastValidity(entity))
                    return GenericResponse<bool>.BadRequest(
                        $"This quotation expired on {entity.ValidUntil:yyyy-MM-dd} and can no longer be accepted. Duplicate it to issue a new revision.");

                entity.Status = model.Status;
                entity.UpdatedDate = DateTime.UtcNow;
                await _repository.UpdateAsync(entity);
                var saved = await _uk.CommitAsync();
                if (!saved)
                    return GenericResponse<bool>.Failure("Failed to change quotation status.");

                _logger.LogInformation("Quotation {No} moved to {Status}", entity.QuotationNo, entity.Status);
                return GenericResponse<bool>.Success(true, $"Quotation status changed to {entity.Status}.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(QuotationService), nameof(ChangeStatusAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> SendAsync(int id, int currentUserId, bool isAdmin)
        {
            try
            {
                var entity = await LoadFullAsync(id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Quotation with id {id} was not found.");

                if (!CanAccess(entity, currentUserId, isAdmin))
                    return GenericResponse<bool>.Unauthorized("You can only send quotations assigned to you.");


                if (!entity.Items.Any())
                    return GenericResponse<bool>.BadRequest("A quotation cannot be sent without at least one item.");

                if (IsPastValidity(entity))
                    return GenericResponse<bool>.BadRequest(
                        $"The validity date ({entity.ValidUntil:yyyy-MM-dd}) has passed. Update it before sending.");

                entity.Status = QuotationStatusEnum.Sent;
                entity.UpdatedDate = DateTime.UtcNow;
                await _repository.UpdateAsync(entity);
                var saved = await _uk.CommitAsync();
                if (!saved)
                    return GenericResponse<bool>.Failure("Failed to send quotation.");
                return GenericResponse<bool>.Success(true, $"Quotation {entity.QuotationNo} sent to the customer.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(QuotationService), nameof(SendAsync));
                throw;
            }
        }

        public async Task<GenericResponse<QuotationDTO>> DuplicateAsync(int id, int salesAgentId, bool isAdmin)
        {
            try
            {
                var source = await LoadFullAsync(id);
                if (source == null)
                    return GenericResponse<QuotationDTO>.NotFound($"Quotation with id {id} was not found.");

                if (!CanAccess(source, salesAgentId, isAdmin))
                    return GenericResponse<QuotationDTO>.Unauthorized("You can only duplicate quotations assigned to you.");

                var copy = new Quotation
                {
                    QuotationNo = GenerateQuotationNo(),
                    CustomerId = source.CustomerId,
                    SalesAgentId = salesAgentId,
                    CurrencyId = source.CurrencyId,
                    TravelStartDate = source.TravelStartDate,
                    TravelEndDate = source.TravelEndDate,
                    Adults = source.Adults,
                    Children = source.Children,
                    Infants = source.Infants,
                    ExchangeRate = source.ExchangeRate,
                    ValidUntil = source.ValidUntil,
                    Notes = source.Notes,
                    Status = QuotationStatusEnum.Draft,
                    CreatedDate = DateTime.UtcNow,
                    UpdatedDate = DateTime.UtcNow,
                    Items = source.Items.Select(i => new QuotationItem
                    {
                        ItemType = i.ItemType,
                        Description = i.Description,
                        Quantity = i.Quantity,
                        CostPrice = i.CostPrice,
                        SellingPrice = i.SellingPrice,
                        Discount = i.Discount,
                        Total = i.Total,
                        SortOrder = i.SortOrder,
                        PackageId = i.PackageId,
                        TourId = i.TourId,
                        HotelId = i.HotelId,
                        FlightId = i.FlightId
                    }).ToList()
                };

                ApplyTotals(copy, source.Discount, source.TaxRate);
                await _repository.AddAsync(copy);
                var saved = await _uk.CommitAsync();
                if (!saved)
                    return GenericResponse<QuotationDTO>.Failure("Failed to duplicate quotation.");

                var created = await LoadFullAsync(copy.Id);
                return GenericResponse<QuotationDTO>.Success(
                    _mapper.Map<QuotationDTO>(created),
                    $"Quotation duplicated as draft {copy.QuotationNo}.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(QuotationService), nameof(DuplicateAsync));
                throw;
            }
        }

        public async Task<GenericResponse<QuotationSummaryDTO>> GetSummaryAsync(int? salesAgentId)
        {
            try
            {
                var quotations = salesAgentId.HasValue
                    ? (await _repository.GetAllByAsync(q => q.SalesAgentId == salesAgentId.Value)).ToList()
                    : (await _repository.GetAllAsync()).ToList();

                var accepted = quotations.Count(q => q.Status == QuotationStatusEnum.Accepted);
                var decided = quotations.Count(q =>
                    q.Status == QuotationStatusEnum.Accepted || q.Status == QuotationStatusEnum.Rejected);

                var summary = new QuotationSummaryDTO
                {
                    Total = quotations.Count,
                    Draft = quotations.Count(q => q.Status == QuotationStatusEnum.Draft),
                    Sent = quotations.Count(q => q.Status == QuotationStatusEnum.Sent),
                    Accepted = accepted,
                    Rejected = quotations.Count(q => q.Status == QuotationStatusEnum.Rejected),
                    Expired = quotations.Count(q => q.Status == QuotationStatusEnum.Expired),
                    Cancelled = quotations.Count(q => q.Status == QuotationStatusEnum.Cancelled),
                    AcceptedValue = quotations.Where(q => q.Status == QuotationStatusEnum.Accepted).Sum(q => q.TotalAmount),
                    PipelineValue = quotations.Where(q => q.Status == QuotationStatusEnum.Sent).Sum(q => q.TotalAmount),
                    ConversionRate = decided == 0 ? 0 : decimal.Round((decimal)accepted / decided * 100, 2)
                };

                return GenericResponse<QuotationSummaryDTO>.Success(summary);
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(QuotationService), nameof(GetSummaryAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> DeleteAsync(int id, int currentUserId, bool isAdmin)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Quotation with id {id} was not found.");

                if (!CanAccess(entity, currentUserId, isAdmin))
                    return GenericResponse<bool>.Unauthorized("You can only delete quotations assigned to you.");

                // Sent/accepted/rejected quotations are commercial records and must be kept for audit.
                if (entity.Status is not (QuotationStatusEnum.Draft or QuotationStatusEnum.Cancelled))
                    return GenericResponse<bool>.BadRequest(
                        $"A '{entity.Status}' quotation cannot be deleted. Cancel it instead to keep the audit trail.");

                await _repository.DeleteAsync(entity);
                var saved = await _uk.CommitAsync();
                if (!saved)
                    return GenericResponse<bool>.Failure("Failed to delete quotation.");

                return GenericResponse<bool>.Success(true, "Quotation deleted successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(QuotationService), nameof(DeleteAsync));
                throw;
            }
        }

        public async Task<GenericResponse<byte[]>> GeneratePdfAsync(int id, int currentUserId, bool isAdmin)
        {
            try
            {
                var quotation = await LoadFullAsync(id);
                if (quotation == null)
                    return GenericResponse<byte[]>.NotFound($"Quotation with id {id} was not found.");

                if (!CanAccess(quotation, currentUserId, isAdmin))
                    return GenericResponse<byte[]>.Unauthorized("You can only download quotations assigned to you.");

                var dto = _mapper.Map<QuotationDTO>(quotation);
                await EnrichPdfItemsAsync(dto);
                var document = new QuotationPdfDocument(dto);
                var bytes = document.GeneratePdf();

                return GenericResponse<byte[]>.Success(bytes, "Quotation PDF generated successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(QuotationService), nameof(GeneratePdfAsync));
                throw;
            }
        }

        private async Task<Quotation?> LoadFullAsync(int id)
        {
            return await _repository.GetByAsync(
                q => q.Id == id,
                q => q.Customer, q => q.SalesAgent!, q => q.Currency, q => q.Items);
        }

        private static bool CanAccess(Quotation quotation, int currentUserId, bool isAdmin)
            => isAdmin || quotation.SalesAgentId == currentUserId;

        private async Task EnrichPdfItemsAsync(QuotationDTO quotation)
        {
            foreach (var item in quotation.Items)
            {
                if (item.PackageId is > 0)
                {
                    var package = await _packageRepository.GetByAsync(p => p.Id == item.PackageId.Value, p => p.Images);
                    if (package != null)
                    {
                        item.Description = string.IsNullOrWhiteSpace(item.Description) ? package.NameEng : item.Description;
                        item.ImageUrl = package.Images.FirstOrDefault()?.ImageUrl;
                        item.ServiceStartDate = package.DateFrom;
                        item.ServiceEndDate = package.DateTo;
                    }
                }
                else if (item.TourId is > 0)
                {
                    var tour = await _tourRepository.GetByAsync(t => t.Id == item.TourId.Value, t => t.Images);
                    if (tour != null)
                    {
                        item.Description = string.IsNullOrWhiteSpace(item.Description) ? tour.TitleEng : item.Description;
                        item.ImageUrl = tour.CoverImageUrl ?? tour.Images.FirstOrDefault()?.ImageUrl;
                        item.ServiceStartDate = tour.StartDate;
                        item.ServiceEndDate = tour.EndDate;
                    }
                }
                else if (item.HotelId is > 0)
                {
                    var hotel = await _hotelRepository.GetByIdAsync(item.HotelId.Value);
                    if (hotel != null && string.IsNullOrWhiteSpace(item.Description)) item.Description = hotel.Name;
                }
                else if (item.FlightId is > 0)
                {
                    var flight = await _flightRepository.GetByAsync(f => f.Id == item.FlightId.Value, f => f.Airline!);
                    if (flight != null)
                    {
                        if (string.IsNullOrWhiteSpace(item.Description))
                            item.Description = $"{flight.Airline?.Name} {flight.FlightNumber}: {flight.DepartureAirport} - {flight.ArrivalAirport}";
                        item.ServiceStartDate = flight.DepartureTime;
                        item.ServiceEndDate = flight.ArrivalTime;
                    }
                }
            }
        }

        /// <summary>
        /// Marks quotations whose validity date has passed as Expired so the pipeline stays accurate.
        /// </summary>
        private async Task ExpireOverdueAsync(IList<Quotation> quotations)
        {
            foreach (var quotation in quotations.Where(q =>
                         q.Status is QuotationStatusEnum.Draft or QuotationStatusEnum.Sent && IsPastValidity(q)))
            {
                quotation.Status = QuotationStatusEnum.Expired;
                quotation.UpdatedDate = DateTime.UtcNow;
                await _repository.UpdateAsync(quotation);
            }
           await _uk.CommitAsync();

        }

        private static bool IsPastValidity(Quotation quotation)
            => quotation.ValidUntil < DateOnly.FromDateTime(DateTime.UtcNow);

        /// <summary>
        /// Ensures every referenced package/tour/hotel/flight actually exists.
        /// </summary>
        private async Task<IList<string>> ValidateItemReferencesAsync(IEnumerable<CreateQuotationItemDTO> items)
        {
            var errors = new List<string>();

            foreach (var item in items)
            {
                if (item.PackageId is > 0 && await _packageRepository.GetByIdAsync(item.PackageId.Value) == null)
                    errors.Add($"Package with id {item.PackageId} was not found.");

                if (item.TourId is > 0 && await _tourRepository.GetByIdAsync(item.TourId.Value) == null)
                    errors.Add($"Tour with id {item.TourId} was not found.");

                if (item.HotelId is > 0 && await _hotelRepository.GetByIdAsync(item.HotelId.Value) == null)
                    errors.Add($"Hotel with id {item.HotelId} was not found.");

                if (item.FlightId is > 0 && await _flightRepository.GetByIdAsync(item.FlightId.Value) == null)
                    errors.Add($"Flight with id {item.FlightId} was not found.");
            }

            return errors.Distinct().ToList();
        }

        private static QuotationItem BuildItem(CreateQuotationItemDTO dto)
        {
            // Line discount is an amount off the whole line, not off the unit price.
            var lineTotal = (dto.SellingPrice * dto.Quantity) - dto.Discount;
            return new QuotationItem
            {
                ItemType = dto.ItemType,
                Description = dto.Description,
                Quantity = dto.Quantity,
                CostPrice = dto.CostPrice,
                SellingPrice = dto.SellingPrice,
                Discount = dto.Discount,
                Total = lineTotal < 0 ? 0 : lineTotal,
                SortOrder = dto.SortOrder,
                PackageId = dto.PackageId,
                TourId = dto.TourId,
                HotelId = dto.HotelId,
                FlightId = dto.FlightId
            };
        }

        private static void ApplyTotals(Quotation entity, decimal discount, decimal taxRate)
        {
            entity.SubTotal = decimal.Round(entity.Items.Sum(i => i.Total), 2);
            entity.TotalCost = decimal.Round(entity.Items.Sum(i => i.CostPrice * i.Quantity), 2);

            entity.Discount = discount > entity.SubTotal ? entity.SubTotal : discount;

            var taxable = entity.SubTotal - entity.Discount;
            entity.TaxRate = taxRate;
            entity.Tax = decimal.Round(taxable * taxRate / 100m, 2);
            entity.TotalAmount = decimal.Round(taxable + entity.Tax, 2);
        }

        private static string GenerateQuotationNo()
            => $"QT-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString()[..6].ToUpper()}";
    }
}
