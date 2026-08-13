using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using QuestPDF.Helpers;
using TravelAgency.Application.DTOs.Destinations;
using TravelAgency.Application.DTOs.Tours;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Application.Validators;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Models;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.Application.Services
{
    public class TourService : ITourService
    {
        private readonly IGenericRepository<Tour> _repository;
        private readonly IGenericRepository<TourImage> _tourImageRepository;
        private readonly IGenericRepository<TourHighlight> _highlightRepository;
        private readonly IGenericRepository<TourInclude> _includeRepository;
        private readonly IGenericRepository<TourExclude> _excludeRepository;
        private readonly IGenericRepository<Destination> _destinationRepository;
        private readonly IGenericRepository<City> _cityRepository;
        private readonly IGenericRepository<TourItinerary> _itineraryRepository;
        private readonly IGenericRepository<TourImage> _imageRepository;
        private readonly IUnitOfWork _uk;
        private readonly IMapper _mapper;
        private readonly ILogger<TourService> _logger;
        private readonly IValidator<CreateTourDTO> _createValidator;
        private readonly IValidator<UpdateTourDTO> _updateValidator;
        private readonly IValidator<ChangeStatusDTO> _changeStatusValidator;
        private readonly IValidator<AddTourImageDTO> _addImagesValidator;
        private readonly IValidator<AddTourItenraryDTO> _addItineraryValidator;

        public TourService(
            IGenericRepository<TourImage> tourImageRepository,
            IGenericRepository<Tour> repository,
            IGenericRepository<TourHighlight> highlightRepository,
            IGenericRepository<TourInclude> includeRepository,
            IGenericRepository<TourExclude> excludeRepository,
            IGenericRepository<Destination> destinationRepository,
            IGenericRepository<City> cityRepository,
            IGenericRepository<TourItinerary> itineraryRepository,
            IGenericRepository<TourImage> imageRepository,
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ILogger<TourService> logger,
            IValidator<CreateTourDTO> createValidator,
            IValidator<UpdateTourDTO> updateValidator,
            IValidator<ChangeStatusDTO> changeStatusValidator,
            IValidator<AddTourImageDTO> addImagesValidator,
            IValidator<AddTourItenraryDTO> addItineraryValidator)
        {
            _repository = repository;
            _tourImageRepository = tourImageRepository;
            _highlightRepository = highlightRepository;
            _includeRepository = includeRepository;
            _excludeRepository = excludeRepository;
            _uk = unitOfWork;
            _destinationRepository = destinationRepository;
            _cityRepository = cityRepository;
            _itineraryRepository = itineraryRepository;
            _imageRepository = imageRepository;
            _mapper = mapper;
            _logger = logger;
            _createValidator = createValidator;
            _updateValidator = updateValidator;
            _changeStatusValidator = changeStatusValidator;
            _addImagesValidator = addImagesValidator;
            _addItineraryValidator = addItineraryValidator;
        }
        public async Task<GenericResponse<PaginationModel<TourHomeDTO>>> GetHomePageAsync()
        {
            try
            {
                var d = await _repository.GetPaggingByIncludeAsync(
                    1,
                    9,
                    s => s.IsActive,
                    s=>s.Destination,
                    s => s.City!);
                var res = new PaginationModel<TourHomeDTO>
                {
                    Data = _mapper.Map<List<TourHomeDTO>>(d.Data) ,
                    Page = d.Page,
                    PageSize = d.PageSize,
                    TotalCount = d.TotalCount
                };

                return GenericResponse<PaginationModel<TourHomeDTO>>.Success(res);


            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TourService), nameof(GetHomePageAsync));
                throw;
            }
        }


        public async Task<GenericResponse<PaginationModel<TourDTO>>> GetAllAsync(
            int pageNumber,
            int pageSize,
            bool isAvtive = false,
            int? destinationId = null,
            int? cityId = null)
        {
            try
            {
                pageSize = Math.Clamp(pageSize, 1, 100);
                var d = await _repository.GetPaggingByIncludeAsync(
                    pageNumber,
                    pageSize,
                    s => (!isAvtive || s.IsActive)
                         && (!destinationId.HasValue || s.DestinationId == destinationId.Value)
                         && (!cityId.HasValue || s.CityId == cityId.Value),
                    t => t.Highlights,
                    t => t.Includes,
                    t => t.Excludes,
                    t => t.Destination,
                    t => t.City!,
                    t => t.Itinerary,
                    t => t.Images);

                var res = new PaginationModel<TourDTO> {
                    Data = d.Data.Select(MapTour).ToList(),
                    Page=d.Page,
                    PageSize=d.PageSize,
                    TotalCount=d.TotalCount
                };
                return GenericResponse<PaginationModel<TourDTO>>.Success(res);
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TourService), nameof(GetAllAsync));
                throw;
            }
        }

        public async Task<GenericResponse<IList<TourDTO>>> GetByDestinationAsync(int destinationId)
        {
            try
            {
                var tours = await _repository.GetAllByAsync(
                    t => t.DestinationId == destinationId,
                    t => t.Destination,
                    t => t.City!,
                    t => t.Itinerary,
                    t => t.Images);
                return GenericResponse<IList<TourDTO>>.Success(
                    tours.Select(MapTour).ToList());
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TourService), nameof(GetByDestinationAsync));
                throw;
            }
        }

        public async Task<GenericResponse<TourDTO?>> GetByIdAsync(int id)
        {
            try
            {
                var tour =   await _repository.GetByAsync(
                    tour => tour.Id == id,
                    tour => tour.Highlights,
                    tour => tour.Includes,
                    tour => tour.Excludes,
                    tour => tour.Destination,
                    tour => tour.City!,
                    tour => tour.Itinerary,
                    tour => tour.Images);
                if (tour == null)
                    return GenericResponse<TourDTO?>.NotFound($"Tour with id {id} was not found.");

                return GenericResponse<TourDTO?>.Success(MapTour(tour));
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TourService), nameof(GetByIdAsync));
                throw;
            }
        }

        public async Task<GenericResponse<TourDTO>> AddAsync(CreateTourDTO model)
        {
            try
            {
                var validation = await _createValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<TourDTO>.BadRequest("Invalid tour data.", validation.Errors.Select(e => e.ErrorMessage));

                var destination = await _destinationRepository.GetByIdAsync(model.DestinationId);
                if (destination == null)
                    return GenericResponse<TourDTO>.BadRequest($"Destination with id {model.DestinationId} was not found.");

                var city = await _cityRepository.GetByAsync(
                    item => item.Id == model.CityId!.Value
                            && item.DestinationId == model.DestinationId);
                if (city == null)
                    return GenericResponse<TourDTO>.BadRequest(
                        "The selected city does not belong to the selected destination.");

                var entity = _mapper.Map<Tour>(model);
                entity.IsActive = true;
                entity.SeatsBooked = 0;

                     await _repository.AddAsync(entity);
                if (!await _uk.CommitAsync())
                    return GenericResponse<TourDTO>.Failure("Failed to add tour.");

                _logger.LogInformation("Tour {TitleEng} created with id {Id}", entity.TitleEng, entity.Id);

                var created = await LoadFullAsync(entity.Id);
                return GenericResponse<TourDTO>.Success(
                    MapTour(created!),
                    "Tour added successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TourService), nameof(AddAsync));
                throw;
            }
        }

        public async Task<GenericResponse<TourDTO>> AddImagesAsync(
            AddTourImageDTO model,
            CancellationToken cancellationToken)
        {
            try
            {
                var validation = await _addImagesValidator.ValidateAsync(model, cancellationToken);
                if (!validation.IsValid)
                    return GenericResponse<TourDTO>.BadRequest(
                        "Invalid tour images.",
                        validation.Errors.Select(error => error.ErrorMessage));

                var tour = await LoadFullAsync(model.TourId);
                if (tour == null)
                    return GenericResponse<TourDTO>.NotFound($"Tour with id {model.TourId} was not found.");


                var images = new List<TourImage>();

                foreach (var image in model.Images)
                {
                    var fileName = Path.GetFileName(image.FileName);
                    images.Add(new TourImage
                    {
                        TourId = tour.Id,
                        ImageName = image.FileName,
                        ImageSize = image.Length.ToString(),
                        ImageUrl = $"tours/{tour.Id}/{fileName}"
                    });
                }
                var selectedCover = model.CoverImageIndex.HasValue
                    ? images[model.CoverImageIndex.Value]
                    : null;
                var existingCover = tour.Images.FirstOrDefault(
                    image => ImageUrlsMatch(image.ImageUrl, tour.CoverImageUrl));
                // Do not replace a tour's existing cover just because more gallery
                // images were added. The client can explicitly select a new cover.
                if (selectedCover != null || existingCover == null)
                {
                    tour.CoverImageUrl = (
                        selectedCover
                        ?? tour.Images.OrderBy(image => image.Id).FirstOrDefault()
                        ?? images[0]).ImageUrl;
                    await _repository.UpdateAsync(tour);
                }
                await _imageRepository.AddListAsync(images);
                try
                {
                    await Helper.SaveImagesAsync($"tours/{tour.Id}", model.Images, cancellationToken);
                    if (!await _uk.CommitAsync())
                    {
                        await DeleteTourImageFilesAsync(images, cancellationToken);
                        return GenericResponse<TourDTO>.Failure("Failed to add tour images.");
                    }
                }
                catch
                {
                    await DeleteTourImageFilesAsync(images, cancellationToken);
                    throw;
                }

                var updated = await LoadFullAsync(tour.Id);
                return GenericResponse<TourDTO>.Success(MapTour(updated!), "Tour images added successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TourService), nameof(AddImagesAsync));
                throw;
            }
        }

        public async Task<GenericResponse<TourDTO>> SetCoverImageAsync(SetTourCoverImageDTO model)
        {
            try
            {
                if (model.TourId <= 0 || model.ImageId <= 0)
                    return GenericResponse<TourDTO>.BadRequest("A valid tour and image are required.");

                var tour = await LoadFullAsync(model.TourId);
                if (tour == null)
                    return GenericResponse<TourDTO>.NotFound($"Tour with id {model.TourId} was not found.");

                var image = tour.Images.FirstOrDefault(item => item.Id == model.ImageId);
                if (image == null || string.IsNullOrWhiteSpace(image.ImageUrl))
                    return GenericResponse<TourDTO>.BadRequest("The selected image does not belong to this tour.");

                tour.CoverImageUrl = image.ImageUrl;
                await _repository.UpdateAsync(tour);
                if (!await _uk.CommitAsync())
                    return GenericResponse<TourDTO>.Failure("Failed to update the tour cover image.");

                var updated = await LoadFullAsync(tour.Id);
                return GenericResponse<TourDTO>.Success(
                    MapTour(updated!),
                    "Tour cover image updated successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TourService), nameof(SetCoverImageAsync));
                throw;
            }
        }

        public async Task<GenericResponse<TourDTO>> AddItineraryAsync(AddTourItenraryDTO model)
        {
            try
            {
                var validation = await _addItineraryValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<TourDTO>.BadRequest(
                        "Invalid tour itinerary.",
                        validation.Errors.Select(error => error.ErrorMessage));

                var tour = await LoadFullAsync(model.TourId);
                if (tour == null)
                    return GenericResponse<TourDTO>.NotFound($"Tour with id {model.TourId} was not found.");

                if (TourItineraryValidation.Flatten(model.Itinerary)
                    .Any(item => item.DayNumber > tour.DurationDays))
                {
                    return GenericResponse<TourDTO>.BadRequest(
                        "Itinerary day numbers cannot exceed the tour duration in days.");
                }

                var itinerary = model.Itinerary
                    .Select(item => MapItinerary(item, tour))
                    .ToList();
                await _itineraryRepository.AddListAsync(itinerary);
                if (!await _uk.CommitAsync())
                    return GenericResponse<TourDTO>.Failure("Failed to add tour itinerary.");

                var updated = await LoadFullAsync(tour.Id);
                return GenericResponse<TourDTO>.Success(MapTour(updated!), "Tour itinerary added successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TourService), nameof(AddItineraryAsync));
                throw;
            }
        }

        public async Task<GenericResponse<TourDTO>> UpdateAsync(UpdateTourDTO model)
        {
            try
            {
                var validation = await _updateValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<TourDTO>.BadRequest("Invalid tour data.", validation.Errors.Select(e => e.ErrorMessage));

                var entity = await _repository.GetByAsync(
                    tour => tour.Id == model.Id,
                    tour => tour.Highlights,
                    tour => tour.Includes,
                    tour => tour.Excludes
                    );
                if (entity == null)
                    return GenericResponse<TourDTO>.NotFound($"Tour with id {model.Id} was not found.");

                var destination = await _destinationRepository.GetByIdAsync(model.DestinationId);
                if (destination == null)
                    return GenericResponse<TourDTO>.BadRequest($"Destination with id {model.DestinationId} was not found.");

                var city = await _cityRepository.GetByAsync(
                    item => item.Id == model.CityId!.Value
                            && item.DestinationId == model.DestinationId);
                if (city == null)
                    return GenericResponse<TourDTO>.BadRequest(
                        "The selected city does not belong to the selected destination.");

                if (model.MaxSeats < entity.SeatsBooked)
                    return GenericResponse<TourDTO>.BadRequest($"Max seats can not be less than the {entity.SeatsBooked} already booked seats.");


                #region highlights
                var deletedHighlights = entity.Highlights.Where(h => !model.Highlights.Any(mh => mh.Id == h.Id)).ToList();
                var addHighlights = new List<TourHighlight>();
                if (deletedHighlights.Any())
                    await _highlightRepository.DeleteListAsync(deletedHighlights);

                model.Highlights.ForEach(highlight =>
                {
                    var existingHighlight = entity.Highlights.FirstOrDefault(h => h.Id == highlight.Id);
                    if (existingHighlight != null)
                    {
                        existingHighlight.Value = highlight.Value;

                    }
                    else
                    {
                        addHighlights.Add(new TourHighlight { Value = highlight.Value, TourId = model.Id });
                    }
                });


                #endregion
                #region includes
                // Delete
                var addIncludes = new List<TourInclude>();
                var deletedIncludes = entity.Includes
                    .Where(i => !model.Includes.Any(mi => mi.Id == i.Id))
                    .ToList();
                if (deletedIncludes.Any())
                    await _includeRepository.DeleteListAsync(deletedIncludes);

                // Add & Update
                foreach (var include in model.Includes)
                {
                    var existing = entity.Includes.FirstOrDefault(i => i.Id == include.Id);

                    if (existing != null)
                    {
                        existing.Value = include.Value;
                    }
                    else
                    {
                        addIncludes.Add(new TourInclude
                        {
                            Value = include.Value,
                            TourId = model.Id
                        });
                    }
                }

                #endregion
                #region Excludes
                // Delete
                var addExcludes = new List<TourExclude>();
                var deletedExcludes = entity.Excludes
                    .Where(i => !model.Excludes.Any(mi => mi.Id == i.Id))
                    .ToList();
                if (deletedIncludes.Any())
                    await _excludeRepository.DeleteListAsync(deletedExcludes);



                // Add & Update
                foreach (var exclude in model.Excludes)
                {
                    var existing = entity.Excludes.FirstOrDefault(i => i.Id == exclude.Id);

                    if (existing != null)
                    {
                        existing.Value = exclude.Value;
                    }
                    else
                    {
                        addExcludes.Add(new TourExclude
                        {
                            Value = exclude.Value,
                            TourId = model.Id
                        });
                    }
                }
                #endregion
                _mapper.Map(model, entity);
             
                await _excludeRepository.AddListAsync(addExcludes);
                await _includeRepository.AddListAsync(addIncludes);
                await _highlightRepository.AddListAsync(addHighlights);

                var res = await _uk.CommitAsync();
                if (!res)
                {
                    return GenericResponse<TourDTO>.Failure("Failed to save changes");
                }

                var updated = await LoadFullAsync(entity.Id);
                return GenericResponse<TourDTO>.Success(
                    MapTour(updated!),
                    "Tour updated successfully.");
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Unhandled error in {Service}.{Method}", nameof(TourService), nameof(UpdateAsync));
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
                    return GenericResponse<bool>.NotFound($"Tour with id {model.Id} was not found.");

                entity.IsActive = model.IsActive;
                await _uk.CommitAsync();
                return GenericResponse<bool>.Success(true, $"Tour status changed to {(model.IsActive ? "active" : "inactive")}.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TourService), nameof(ChangeStatusAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> DeleteAsync(int id)
        {
            try
            {
                var entity = await LoadFullAsync(id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Tour with id {id} was not found.");

                await DeleteItineraryAsync(entity.Itinerary);

                await _repository.DeleteAsync(entity);
                await _uk.CommitAsync();
                return GenericResponse<bool>.Success(true, "Tour deleted successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TourService), nameof(DeleteAsync));
                throw;
            }
        }

        private async Task<Tour?> LoadFullAsync(int id)
        {
            return await _repository.GetByAsync(
                tour => tour.Id == id,
                tour => tour.Destination,
                tour => tour.City!,
                tour => tour.Itinerary,
                tour => tour.Images);
        }

        private static TourItinerary MapItinerary(
            CreateTourItineraryDTO dto,
            Tour tour,
            TourItinerary? parent = null)
        {
            var entity = new TourItinerary
            {
                Parent = parent,
                IsChildNode = parent != null,
                Tour = tour,
                Title = dto.Title,
                Value = dto.Value,
                Description = dto.Description,
                DayNumber = dto.DayNumber,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime
            };

            entity.Childs = dto.Childs
                .Select(child => MapItinerary(child, tour, entity))
                .ToList();

            return entity;
        }

        private TourDTO MapTour(Tour tour)
        {
            var dto = _mapper.Map<TourDTO>(tour);
            dto.Images = tour.Images
                .OrderBy(image => ImageUrlsMatch(image.ImageUrl, tour.CoverImageUrl) ? 0 : 1)
                .ThenBy(image => image.Id)
                .Select(image => _mapper.Map<TravelAgency.Application.DTOs.ImageDTO>(image))
                .ToList();
            dto.Itinerary = BuildItineraryTree(tour.Itinerary);
            return dto;
        }

        private async Task DeleteItineraryAsync(IEnumerable<TourItinerary> itinerary)
        {
            var items = itinerary.DistinctBy(item => item.Id).ToList();
            if (items.Count > 0)
                await _itineraryRepository.DeleteListAsync(items);
        }

        private static List<TourItineraryDTO> BuildItineraryTree(
            IEnumerable<TourItinerary> itinerary)
        {
            var items = itinerary.DistinctBy(item => item.Id).ToList();
            var dtoById = items.ToDictionary(
                item => item.Id,
                item => new TourItineraryDTO
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

            var roots = new List<TourItineraryDTO>();
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
        public async Task<GenericResponse<bool>> DeleteImageAsync(int ImageId, CancellationToken cancellationToken)
        {
            try
            {

                var entity = await _tourImageRepository.GetByIdAsync(ImageId);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Image with id {ImageId} was not found.");

                var tour = await LoadFullAsync(entity.TourId);
                if (tour == null)
                    return GenericResponse<bool>.NotFound($"Tour with id {entity.TourId} was not found.");

                var deletedCover = ImageUrlsMatch(tour.CoverImageUrl, entity.ImageUrl);
                var coverStillExists = tour.Images.Any(
                    image => image.Id != entity.Id && ImageUrlsMatch(tour.CoverImageUrl, image.ImageUrl));
                var replacementCover = tour.Images
                    .Where(image => image.Id != entity.Id && !string.IsNullOrWhiteSpace(image.ImageUrl))
                    .OrderBy(image => image.Id)
                    .Select(image => image.ImageUrl)
                    .FirstOrDefault();

                await _tourImageRepository.DeleteAsync(entity);
                if (deletedCover || !coverStillExists)
                {
                    tour.CoverImageUrl = replacementCover;
                    await _repository.UpdateAsync(tour);
                }
                if (!await _uk.CommitAsync())
                    return GenericResponse<bool>.Failure("Failed to delete the image.");

                await DeleteTourImageFileAsync(entity.ImageUrl, cancellationToken);
                return GenericResponse<bool>.Success(true, "Image deleted successfully.");
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(TourService), nameof(DeleteImageAsync));
                throw;
            }
        }
        private static void SortItinerary(List<TourItineraryDTO> itinerary)
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

        private static bool ImageUrlsMatch(string? first, string? second)
        {
            if (string.IsNullOrWhiteSpace(first) || string.IsNullOrWhiteSpace(second))
                return false;

            return string.Equals(
                NormalizeImageUrl(first),
                NormalizeImageUrl(second),
                StringComparison.OrdinalIgnoreCase);
        }

        private static string NormalizeImageUrl(string url)
        {
            var value = url.Trim().Replace('\\', '/').TrimStart('/');
            return value.StartsWith("images/", StringComparison.OrdinalIgnoreCase)
                ? value["images/".Length..]
                : value;
        }

        

        private static Task DeleteTourImageFileAsync(string? imageUrl, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(imageUrl))
                return Task.CompletedTask;

            var relativePath = NormalizeImageUrl(imageUrl);
            if (string.IsNullOrWhiteSpace(relativePath))
                return Task.CompletedTask;
            var imageRoot = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
            var filePath = Path.GetFullPath(Path.Combine(imageRoot, relativePath));
            if (!filePath.StartsWith(Path.GetFullPath(imageRoot) + Path.DirectorySeparatorChar,
                    StringComparison.OrdinalIgnoreCase))
                return Task.CompletedTask;

            if (File.Exists(filePath))
                File.Delete(filePath);

            return Task.CompletedTask;
        }

        private static Task DeleteTourImageFilesAsync(
            IEnumerable<TourImage> images,
            CancellationToken cancellationToken)
            => Task.WhenAll(images.Select(image => DeleteTourImageFileAsync(image.ImageUrl, cancellationToken)));
    }
}
