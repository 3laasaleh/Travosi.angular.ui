using AutoMapper;
using FluentValidation;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using TravelAgency.Application.DTOs.Destinations;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Models;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.Application.Services
{
    public class DestinationService : IDestinationService
    {
        private readonly IGenericRepository<Destination> _repository;
        private readonly IGenericRepository<DestinationImage> _repositoryDestinationImage;
        private readonly IGenericRepository<City> _cityRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<DestinationService> _logger;
        private readonly IValidator<CreateDestinationDTO> _createValidator;
        private readonly IValidator<UpdateDestinationDTO> _updateValidator;
        private readonly IValidator<ChangeStatusDTO> _changeStatusValidator;
        private readonly IUnitOfWork _uk;
        public DestinationService(
            IUnitOfWork unitOfWork,
            IGenericRepository<Destination> repository,
            IMapper mapper,
            IGenericRepository<DestinationImage> repositoryDestinationImage,
            IGenericRepository<City> cityRepository,
            ILogger<DestinationService> logger,
            IValidator<CreateDestinationDTO> createValidator,
            IValidator<UpdateDestinationDTO> updateValidator,
        IValidator<ChangeStatusDTO> changeStatusValidator)
        {
            _repository = repository;
            _mapper = mapper;
            _logger = logger;
            _createValidator = createValidator;
            _updateValidator = updateValidator;
            _repositoryDestinationImage = repositoryDestinationImage;
            _cityRepository = cityRepository;
            _changeStatusValidator = changeStatusValidator;
            _uk = unitOfWork;
        }
          /// <summary>
          /// 
          /// </summary>
          /// <param name="page">PageNumber</param>
          /// <param name="pageSize">size of data to return 10 , 20 , 50,100</param>
          /// <param name="isActiveOnly">if true return active data only for home page else return all </param>
          /// <param name="cancellationToken"></param>
          /// <returns></returns>
        public async Task<GenericResponse<PaginationModel<DestinationDTO>>> GetAllAsync(int page,int pageSize,bool isActiveOnly)
        {
            try
            {
                var result = await _repository.GetPaggingByIncludeAsync(
                    page,
                    pageSize,
                    isActiveOnly ? s => s.IsActive : null,
                    d => d.Images,
                    d => d.Cities);


                var paggingModel =  new PaginationModel<DestinationDTO>
                {
                    Data = _mapper.Map<List<DestinationDTO>>(result.Data),
                    Page = result.Page,
                    PageSize = result.PageSize,
                    TotalCount = result.TotalCount
                };

                return GenericResponse<PaginationModel<DestinationDTO>>.Success(paggingModel);
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(DestinationService), nameof(GetAllAsync));
                throw;
            }
        }

        public async Task<GenericResponse<DestinationDTO?>> GetByIdAsync(int id, CancellationToken cancellationToken)
        {
            try
            {
                var destination = await _repository.GetByAsync(
                    d => d.Id == id && d.IsActive,
                    d => d.Images,
                    d => d.Cities);
                if (destination == null)
                    return GenericResponse<DestinationDTO?>.NotFound($"Destination with id {id} was not found.");

                return GenericResponse<DestinationDTO?>.Success(_mapper.Map<DestinationDTO>(destination));
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(DestinationService), nameof(GetByIdAsync));
                throw;
            }
        }

        public async Task<GenericResponse<IList<DestinationNavigationDTO>>> GetNavigationAsync(
            int takeDestinations,
            int takeCities,
            int takeTours)
        {
            try
            {
                takeDestinations = Math.Clamp(takeDestinations, 1, 20);
                takeCities = Math.Clamp(takeCities, 1, 10);
                takeTours = Math.Clamp(takeTours, 1, 10);

                var destinations = (await _repository.GetAllByAsync(
                    destination => destination.IsActive))
                    .OrderBy(destination => destination.NameEng)
                    .Take(takeDestinations)
                    .ToList();

                var destinationIds = destinations.Select(destination => destination.Id).ToList();
                var cities = await _cityRepository.GetAllByAsync(
                    city => city.IsActive
                            && city.DestinationId.HasValue
                            && destinationIds.Contains(city.DestinationId.Value),
                    city => city.Tours);

                var citiesByDestination = cities
                    .GroupBy(city => city.DestinationId!.Value)
                    .ToDictionary(group => group.Key, group => group.AsEnumerable());

                var result = destinations
                    .Select(destination => new DestinationNavigationDTO
                    {
                        Id = destination.Id,
                        NameEng = destination.NameEng,
                        NameAr = destination.NameAr,
                        Cities = (citiesByDestination.TryGetValue(destination.Id, out var destinationCities)
                                ? destinationCities
                                : Enumerable.Empty<City>())
                            .Where(city => city.IsActive)
                            .OrderBy(city => city.NameEng)
                            .Take(takeCities)
                            .Select(city => new DestinationCityNavigationDTO
                            {
                                Id = city.Id,
                                NameEng = city.NameEng ?? string.Empty,
                                NameAr = city.NameAr ?? string.Empty,
                                Tours = city.Tours
                                    .Where(tour => tour.IsActive)
                                    .OrderBy(tour => tour.StartDate < DateTime.UtcNow ? 1 : 0)
                                    .ThenBy(tour => tour.StartDate)
                                    .ThenBy(tour => tour.Id)
                                    .Take(takeTours)
                                    .Select(tour => new DestinationTourNavigationDTO
                                    {
                                        Id = tour.Id,
                                        TitleEng = tour.TitleEng,
                                        TitleAr = tour.TitleAr,
                                        CoverImageUrl = tour.CoverImageUrl,
                                        PricePerPerson = tour.PricePerPerson,
                                        CurrencyId = tour.CurrencyId
                                    })
                                    .ToList()
                            })
                            .ToList()
                    })
                    .ToList();

                return GenericResponse<IList<DestinationNavigationDTO>>.Success(result);
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(DestinationService), nameof(GetNavigationAsync));
                throw;
            }
        }
        
        public async Task<GenericResponse<DestinationDTO>> AddAsync(CreateDestinationDTO model, CancellationToken cancellationToken)
        {
            try
            {
                var validation = await _createValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<DestinationDTO>.BadRequest("Invalid destination data.",
                        validation.Errors.Select(e => e.ErrorMessage));

                var duplicate = await _repository.GetByAsync(d => d.NameEng.ToLower() == model.NameEng.ToLower());
                if (duplicate != null)
                    return GenericResponse<DestinationDTO>.BadRequest($"Destination with name '{model.NameEng}' already exists.");


                var entity = _mapper.Map<Destination>(model);
                var gid= Guid.NewGuid();
                await _repository.AddAsync(entity);
                model.Images.ForEach(item =>
                {
                    entity.Images.Add(new DestinationImage
                    {
                        DestinationId = entity.Id,
                        ImageName = item.FileName,
                        ImageUrl = $"destinations/{gid}/{item.FileName}",
                        ImageSize = item.Length.ToString(),


                    });

                });
           
                var saved = await _uk.CommitAsync();
                if (!saved)
                    return GenericResponse<DestinationDTO>.Failure("Failed to add destination.");

                await   Helper.SaveImagesAsync($"destinations/{gid}", model.Images, cancellationToken);

    ;
                _logger.LogInformation("Destination {NameEng} created with id {Id}", entity.NameEng, entity.Id);
                return GenericResponse<DestinationDTO>.Success(_mapper.Map<DestinationDTO>(entity), "Destination added successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(DestinationService), nameof(AddAsync));
                throw;
            }
        }

        public async Task<GenericResponse<DestinationDTO>> UpdateAsync(UpdateDestinationDTO model, CancellationToken cancellationToken)
        {
            try
            {
                var validation = await _updateValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<DestinationDTO>.BadRequest("Invalid destination data.",
                        validation.Errors.Select(e => e.ErrorMessage));

                var entity = await _repository.GetByAsync(s=>s.Id == model.Id,d=>d.Images);
                if (entity == null)
                    return GenericResponse<DestinationDTO>.NotFound($"Destination with id {model.Id} was not found.");

                if (entity.IsActive )
                    return GenericResponse<DestinationDTO>.BadRequest($"Destination is active., cann't update it ,deactivate it first ");

                var duplicate = await _repository.GetByAsync(d =>
                    d.NameEng.ToLower() == model.NameEng.ToLower() && d.Id != model.Id);
                if (duplicate != null)
                    return GenericResponse<DestinationDTO>.BadRequest($"Destination with name '{model.NameEng}' already exists.");

                _mapper.Map(model, entity);

                model.Images.ForEach(item =>
                {
                    if(entity.Images.Count<5)
                    entity.Images.Add(new DestinationImage
                    {
                        DestinationId = entity.Id,
                        ImageName = item.FileName,
                        ImageUrl = $"destinations/{entity.Id}/{item.FileName}",
                        ImageSize = item.Length.ToString(),

                    });

                });
                await _repository.UpdateAsync(entity);
                await Helper.SaveImagesAsync($"destinations/{entity.Id}", model.Images, cancellationToken);
                await _uk.CommitAsync();
                return GenericResponse<DestinationDTO>.Success(_mapper.Map<DestinationDTO>(entity), "Destination updated successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(DestinationService), nameof(UpdateAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> ChangeStatusAsync(int Id, CancellationToken cancellationToken)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(Id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Destination  was not found.");

                entity.IsActive = !entity.IsActive;
                await _repository.UpdateAsync(entity);
                await _uk.CommitAsync();
                return GenericResponse<bool>.Success(true, $"Destination status changed to {(entity.IsActive ? "active" : "inactive")}.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(DestinationService), nameof(ChangeStatusAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> DeleteImageAsync(int ImageId, CancellationToken cancellationToken)
        {
            try
            {
                var entity = await _repositoryDestinationImage.GetByIdAsync(ImageId);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Image with id {ImageId} was not found.");

                await Helper.DeleteImageAsync($"destinations/{entity.DestinationId}", entity.ImageName!, cancellationToken);

                await _repositoryDestinationImage.DeleteAsync(entity);
                await _uk.CommitAsync();
                return GenericResponse<bool>.Success(true, "Image deleted successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(DestinationService), nameof(DeleteImageAsync));
                throw;
            }
        }
    }
}
