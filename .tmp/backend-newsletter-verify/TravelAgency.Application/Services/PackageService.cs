using AutoMapper;
using FluentValidation;
using Microsoft.Extensions.Logging;
using TravelAgency.Application.DTOs.Destinations;
using TravelAgency.Application.DTOs.Packages;
using TravelAgency.Application.DTOs.Tours;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Application.Validators;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Enums;
using TravelAgency.Domain.Models;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.Application.Services
{
    public class PackageService : IPackageService
    {
        private readonly IGenericRepository<Package> _repository;
        private readonly IGenericRepository<Destination> _destinationRepository;
        private readonly IGenericRepository<PackageDestination> _packageDestinationRepository;
        private readonly IGenericRepository<PackageItinerary> _itineraryRepository;
        private readonly IGenericRepository<PackageImage> _imageRepository;
        private readonly IGenericRepository<Booking> _bookingRepository;
        private readonly IGenericRepository<Currency> _currencyRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<PackageService> _logger;
        private readonly IValidator<CreatePackageDTO> _createValidator;
        private readonly IValidator<UpdatePackageDTO> _updateValidator;
        private readonly IValidator<ChangeStatusDTO> _changeStatusValidator;
        private readonly IValidator<AddPackageImageDTO> _addImagesValidator;
        private readonly IValidator<AddPackageItineraryDTO> _addItineraryValidator;
        private readonly IUnitOfWork _uk;

        public PackageService(
            IGenericRepository<Package> repository,
            IGenericRepository<Destination> destinationRepository,
            IGenericRepository<PackageDestination> packageDestinationRepository,
            IGenericRepository<PackageItinerary> itineraryRepository,
            IGenericRepository<PackageImage> imageRepository,
            IGenericRepository<Booking> bookingRepository,
            IGenericRepository<Currency> currencyRepository,
            IMapper mapper,
            ILogger<PackageService> logger,
            IValidator<CreatePackageDTO> createValidator,
            IValidator<UpdatePackageDTO> updateValidator,
            IValidator<ChangeStatusDTO> changeStatusValidator,
            IValidator<AddPackageImageDTO> addImagesValidator,
            IValidator<AddPackageItineraryDTO> addItineraryValidator,
            IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _destinationRepository = destinationRepository;
            _packageDestinationRepository = packageDestinationRepository;
            _itineraryRepository = itineraryRepository;
            _imageRepository = imageRepository;
            _bookingRepository = bookingRepository;
            _currencyRepository = currencyRepository;
            _mapper = mapper;
            _logger = logger;
            _createValidator = createValidator;
            _updateValidator = updateValidator;
            _changeStatusValidator = changeStatusValidator;
            _addImagesValidator = addImagesValidator;
            _addItineraryValidator = addItineraryValidator;
            _uk = unitOfWork;
        }


        public async Task<GenericResponse<PaginationModel<PackageDTO>>> GetAllAsync(int pageNumber, int pageSize)
        {
            try
            {
                var d = await _repository.GetPaggingByIncludeAsync(
                    pageNumber,
                    pageSize,
                    null,
                    p => p.Itinerary,
                    p => p.Images,
                    p => p.PackageDestination,
                    p => p.Bookings);

                var res = new PaginationModel<PackageDTO>
                {
                    Data = (await MapListAsync(d.Data)).ToList(),
                    Page = d.Page,
                    PageSize = d.PageSize,
                    TotalCount = d.TotalCount
                };
                return GenericResponse<PaginationModel<PackageDTO>>.Success(res);
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(PackageService), nameof(GetAllAsync));
                throw;
            }
        }
        public async Task<GenericResponse<PaginationModel<PackageDTO>>> GetAllActiveAsync(int pageNumber, int pageSize)
        {
            try
            {
                var d = await _repository.GetPaggingByIncludeAsync(
                    pageNumber,
                    pageSize,
                    s => s.IsActive,
                    p => p.Itinerary,
                    p => p.Images,
                    p => p.PackageDestination,
                    p => p.Bookings);

                var res = new PaginationModel<PackageDTO>
                {
                    Data = (await MapListAsync(d.Data)).ToList(),
                    Page = d.Page,
                    PageSize = d.PageSize,
                    TotalCount = d.TotalCount
                };
                return GenericResponse<PaginationModel<PackageDTO>>.Success(res);

            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(PackageService), nameof(GetAllActiveAsync));
                throw;
            }
        }


        public async Task<GenericResponse<IList<PackageDTO>>> GetByDestinationAsync(int destinationId)
        {
            try
            {
                var packages = await _repository.GetAllByAsync(
                    p => p.PackageDestination.Any(d => d.DestinationId == destinationId),
                    p => p.Itinerary, p => p.Images, p => p.PackageDestination, p => p.Bookings);

                return GenericResponse<IList<PackageDTO>>.Success(await MapListAsync(packages.ToList()));
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(PackageService), nameof(GetByDestinationAsync));
                throw;
            }
        }

        public async Task<GenericResponse<PackageDTO?>> GetByIdAsync(int id)
        {
            try
            {
                var package = await LoadFullAsync(id);
                if (package == null)
                    return GenericResponse<PackageDTO?>.NotFound($"Package with id {id} was not found.");

                var dto = (await MapListAsync(new List<Package> { package })).First();
                return GenericResponse<PackageDTO?>.Success(dto);
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(PackageService), nameof(GetByIdAsync));
                throw;
            }
        }

        public async Task<GenericResponse<PackageDTO>> AddAsync(CreatePackageDTO model)
        {
            try
            {
                var validation = await _createValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<PackageDTO>.BadRequest("Invalid package data.", validation.Errors.Select(e => e.ErrorMessage));

                var missing = await GetMissingDestinationsAsync(model.Destinations.Select(d => d.DestinationId));
                if (missing.Any())
                    return GenericResponse<PackageDTO>.BadRequest($"Destination(s) not found: {string.Join(", ", missing)}.");

                if (await _currencyRepository.GetByIdAsync(model.CurrencyId) == null)
                    return GenericResponse<PackageDTO>.BadRequest("Package currency was not found.");

                var duplicate = await _repository.GetByAsync(p => p.NameEng.ToLower() == model.NameEng.ToLower());
                if (duplicate != null)
                    return GenericResponse<PackageDTO>.BadRequest($"A package named '{model.NameEng}' already exists.");

                var entity = _mapper.Map<Package>(model);
                entity.IsActive = true;
                entity.PackageDestination = model.Destinations
                    .Select(d => new PackageDestination { DestinationId = d.DestinationId, DisplayOrder = d.DisplayOrder })
                    .ToList();
                 await _repository.AddAsync(entity);
                var saved = await _uk.CommitAsync();
                if (!saved)
                    return GenericResponse<PackageDTO>.Failure("Failed to add package.");

                _logger.LogInformation("Package {Name} created with id {Id}", entity.NameEng, entity.Id);

                var created = await LoadFullAsync(entity.Id);
                var dto = (await MapListAsync(new List<Package> { created! })).First();
                return GenericResponse<PackageDTO>.Success(dto, "Package added successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(PackageService), nameof(AddAsync));
                throw;
            }
        }

        public async Task<GenericResponse<PackageDTO>> AddImagesAsync(AddPackageImageDTO model)
        {
            try
            {
                var validation = await _addImagesValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<PackageDTO>.BadRequest(
                        "Invalid package images.",
                        validation.Errors.Select(error => error.ErrorMessage));

                var package = await LoadFullAsync(model.PackageId);
                if (package == null)
                    return GenericResponse<PackageDTO>.NotFound(
                        $"Package with id {model.PackageId} was not found.");

                var uploadFolder = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot",
                    "images",
                    "packages",
                    package.Id.ToString());
                Directory.CreateDirectory(uploadFolder);

                var images = new List<PackageImage>();
                foreach (var image in model.Images)
                {
                    var extension = Path.GetExtension(Path.GetFileName(image.FileName));
                    var fileName = $"{Guid.NewGuid():N}{extension}";
                    var filePath = Path.Combine(uploadFolder, fileName);

                    await using var stream = new FileStream(filePath, FileMode.CreateNew);
                    await image.CopyToAsync(stream);

                    images.Add(new PackageImage
                    {
                        PackageId = package.Id,
                        ImageName = image.FileName,
                        ImageSize = image.Length.ToString(),
                        ImageUrl = $"packages/{package.Id}/{fileName}"
                    });
                }
                await _imageRepository.AddListAsync(images);
                if (!await _uk.CommitAsync())
                    return GenericResponse<PackageDTO>.Failure("Failed to add package images.");

                var updated = await LoadFullAsync(package.Id);
                return GenericResponse<PackageDTO>.Success(
                    await MapAsync(updated!),
                    "Package images added successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(PackageService), nameof(AddImagesAsync));
                throw;
            }
        }

        public async Task<GenericResponse<PackageDTO>> AddItineraryAsync(
            AddPackageItineraryDTO model)
        {
            try
            {
                var validation = await _addItineraryValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<PackageDTO>.BadRequest(
                        "Invalid package itinerary.",
                        validation.Errors.Select(error => error.ErrorMessage));

                var package = await LoadFullAsync(model.PackageId);
                if (package == null)
                    return GenericResponse<PackageDTO>.NotFound(
                        $"Package with id {model.PackageId} was not found.");

                if (PackageItineraryValidation.Flatten(model.Itinerary)
                    .Any(item => item.DayNumber > package.DurationDays))
                {
                    return GenericResponse<PackageDTO>.BadRequest(
                        "Itinerary day numbers cannot exceed the package duration in days.");
                }

                await DeleteItineraryAsync(package.Itinerary);
                var itinerary = model.Itinerary
                    .Select(item => MapItinerary(item, package))
                    .ToList();
                await _itineraryRepository.AddListAsync(itinerary);
                if (!await _uk.CommitAsync())
                    return GenericResponse<PackageDTO>.Failure(
                        "Failed to add package itinerary.");

                await _uk.CommitAsync();

                var updated = await LoadFullAsync(package.Id);
                return GenericResponse<PackageDTO>.Success(
                    await MapAsync(updated!),
                    "Package itinerary added successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(PackageService), nameof(AddItineraryAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> DeleteImageAsync(int imageId)
        {
            try
            {
                var image = await _imageRepository.GetByIdAsync(imageId);
                if (image == null)
                    return GenericResponse<bool>.NotFound(
                        $"Package image with id {imageId} was not found.");

                await _imageRepository.DeleteAsync(image);
                 var saved = await _uk.CommitAsync();
                var fileName = Path.GetFileName(image.ImageUrl);
                if (!string.IsNullOrWhiteSpace(fileName))
                {
                    var filePath = Path.Combine(
                        Directory.GetCurrentDirectory(),
                        "wwwroot",
                        "images",
                        "packages",
                        image.PackageId.ToString(),
                        fileName);
                    if (File.Exists(filePath))
                        File.Delete(filePath);
                }

                return GenericResponse<bool>.Success(true, "Package image deleted successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(PackageService), nameof(DeleteImageAsync));
                throw;
            }
        }

        public async Task<GenericResponse<PackageDTO>> UpdateAsync(UpdatePackageDTO model)
        {
            try
            {
                var validation = await _updateValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<PackageDTO>.BadRequest("Invalid package data.", validation.Errors.Select(e => e.ErrorMessage));

                var entity = await LoadFullAsync(model.Id);
                if (entity == null)
                    return GenericResponse<PackageDTO>.NotFound($"Package with id {model.Id} was not found.");

                var missing = await GetMissingDestinationsAsync(model.Destinations.Select(d => d.DestinationId));
                if (missing.Any())
                    return GenericResponse<PackageDTO>.BadRequest($"Destination(s) not found: {string.Join(", ", missing)}.");

                if (await _currencyRepository.GetByIdAsync(model.CurrencyId) == null)
                    return GenericResponse<PackageDTO>.BadRequest("Package currency was not found.");

                var duplicate = await _repository.GetByAsync(p => p.NameEng.ToLower() == model.NameEng.ToLower() && p.Id != model.Id);
                if (duplicate != null)
                    return GenericResponse<PackageDTO>.BadRequest($"A package named '{model.NameEng}' already exists.");

                var bookedTravelers = await GetBookedTravelersAsync(model.Id);
                if (model.MaxCapacity < bookedTravelers)
                    return GenericResponse<PackageDTO>.BadRequest(
                        $"Max capacity cannot be less than the {bookedTravelers} traveler(s) already booked.");

                _mapper.Map(model, entity);

                foreach (var link in entity.PackageDestination.ToList())
                    await _packageDestinationRepository.DeleteAsync(link);

                entity.PackageDestination = model.Destinations
                    .Select(d => new PackageDestination { PackageId = entity.Id, DestinationId = d.DestinationId, DisplayOrder = d.DisplayOrder })
                    .ToList();

                await _repository.UpdateAsync(entity);
                var saved = await _uk.CommitAsync();

                var updated = await LoadFullAsync(entity.Id);
                var dto = (await MapListAsync(new List<Package> { updated! })).First();
                return GenericResponse<PackageDTO>.Success(dto, "Package updated successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(PackageService), nameof(UpdateAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> ChangeStatusAsync(ChangeStatusDTO model)
        {
            try
            {
                var validation = await _changeStatusValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<bool>.BadRequest("Invalid request.", validation.Errors.Select(e => e.ErrorMessage));

                var entity = await _repository.GetByIdAsync(model.Id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Package with id {model.Id} was not found.");

                entity.IsActive = model.IsActive;
                await _repository.UpdateAsync(entity);
                var saved = await _uk.CommitAsync();

                return GenericResponse<bool>.Success(true, $"Package status changed to {(model.IsActive ? "active" : "inactive")}.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(PackageService), nameof(ChangeStatusAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> DeleteAsync(int id)
        {
            try
            {
                var entity = await LoadFullAsync(id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Package with id {id} was not found.");

                var bookings = await _bookingRepository.GetAllByAsync(b => b.PackageId == id);
                if (bookings.Any())
                    return GenericResponse<bool>.BadRequest(
                        "This package has bookings and cannot be deleted. Deactivate it instead.");

                await DeleteItineraryAsync(entity.Itinerary);

                foreach (var destination in entity.PackageDestination.ToList())
                    await _packageDestinationRepository.DeleteAsync(destination);

                await _repository.DeleteAsync(entity);
                var saved = await _uk.CommitAsync();

                return GenericResponse<bool>.Success(true, "Package deleted successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(PackageService), nameof(DeleteAsync));
                throw;
            }
        }

        private async Task<Package?> LoadFullAsync(int id)
        {
            return await _repository.GetByAsync(
                p => p.Id == id,
                p => p.Itinerary, p => p.Images, p => p.PackageDestination, p => p.Bookings);
        }

        private async Task<PackageDTO> MapAsync(Package package)
            => (await MapListAsync(new List<Package> { package })).First();

        private async Task<IList<PackageDTO>> MapListAsync(IList<Package> packages)
        {
            var dtos = _mapper.Map<IList<PackageDTO>>(packages);

            foreach (var dto in dtos)
            {
                var package = packages.First(p => p.Id == dto.Id);
                dto.Itinerary = BuildItineraryTree(package.Itinerary);
                dto.SeatsBooked = package.SeatsBooked;
                dto.SeatsAvailable = package.SeatsAvailable;
            }

            var destinationIds = packages
                .SelectMany(p => p.PackageDestination.Select(d => d.DestinationId))
                .Distinct()
                .ToList();

            if (destinationIds.Count == 0)
                return dtos;

            var destinations = await _destinationRepository.GetAllByAsync(d => destinationIds.Contains(d.Id));
            var nameById = destinations.ToDictionary(d => d.Id, d => d.NameEng);

            foreach (var dto in dtos)
            {
                foreach (var d in dto.Destinations)
                {
                    if (nameById.TryGetValue(d.DestinationId, out var name))
                        d.DestinationName = name;
                }
            }

            return dtos;
        }

        private async Task<IList<int>> GetMissingDestinationsAsync(IEnumerable<int> ids)
        {
            var requested = ids.Distinct().ToList();
            var found = await _destinationRepository.GetAllByAsync(d => requested.Contains(d.Id));
            var foundIds = found.Select(d => d.Id).ToHashSet();
            return requested.Where(id => !foundIds.Contains(id)).ToList();
        }

        private async Task<int> GetBookedTravelersAsync(int packageId)
        {
            var bookings = await _bookingRepository.GetAllByAsync(b =>
                b.PackageId == packageId &&
                (b.Status == BookingStatusEnum.Confirmed || b.Status == BookingStatusEnum.Completed));
            return bookings.Sum(b => b.NumberOfTravelers);
        }

        private static PackageItinerary MapItinerary(
            CreatePackageItineraryDTO dto,
            Package package,
            PackageItinerary? parent = null)
        {
            var entity = new PackageItinerary
            {
                Parent = parent,
                IsChildNode = parent != null,
                Package = package,
                Title = dto.Title,
                Value = dto.Value,
                Description = dto.Description,
                DayNumber = dto.DayNumber,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime
            };

            entity.Childs = dto.Childs
                .Select(child => MapItinerary(child, package, entity))
                .ToList();

            return entity;
        }

        private async Task DeleteItineraryAsync(IEnumerable<PackageItinerary> itinerary)
        {
            var items = itinerary.DistinctBy(item => item.Id).ToList();
            if (items.Count > 0)
                await _itineraryRepository.DeleteListAsync(items);

          

        }

        private static List<PackageItineraryDTO> BuildItineraryTree(
            IEnumerable<PackageItinerary> itinerary)
        {
            var items = itinerary.DistinctBy(item => item.Id).ToList();
            var dtoById = items.ToDictionary(
                item => item.Id,
                item => new PackageItineraryDTO
                {
                    Id = item.Id,
                    ParentId = item.ParentId,
                    IsChildNode = item.ParentId.HasValue,
                    Title = item.Title,
                    Value = item.Value,
                    Description = item.Description,
                    DayNumber = item.DayNumber,
                    StartTime = item.StartTime,
                    EndTime = item.EndTime
                });

            var roots = new List<PackageItineraryDTO>();
            foreach (var item in items)
            {
                var dto = dtoById[item.Id];
                if (item.ParentId.HasValue &&
                    dtoById.TryGetValue(item.ParentId.Value, out var parent))
                {
                    parent.Childs.Add(dto);
                }
                else
                {
                    roots.Add(dto);
                }
            }

            SortItinerary(roots);
            return roots;
        }

        private static void SortItinerary(List<PackageItineraryDTO> itinerary)
        {
            itinerary.Sort((left, right) =>
            {
                var dayComparison = left.DayNumber.CompareTo(right.DayNumber);
                if (dayComparison != 0)
                    return dayComparison;

                var timeComparison = Nullable.Compare(left.StartTime, right.StartTime);
                return timeComparison != 0 ? timeComparison : left.Id.CompareTo(right.Id);
            });

            foreach (var item in itinerary)
                SortItinerary(item.Childs);
        }

   
    }
}
