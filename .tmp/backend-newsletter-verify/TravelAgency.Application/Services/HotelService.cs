using AutoMapper;
using FluentValidation;
using Microsoft.Extensions.Logging;
using TravelAgency.Application.DTOs.Crm;
using TravelAgency.Application.DTOs.Hotels;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Models;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.Application.Services
{
    public class HotelService : IHotelService
    {
        private readonly IGenericRepository<Hotel> _repository;
        private readonly IGenericRepository<Destination> _destinationRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<HotelService> _logger;
        private readonly IValidator<CreateHotelDTO> _createValidator;
        private readonly IValidator<UpdateHotelDTO> _updateValidator;
        private readonly IUnitOfWork _uk;

        public HotelService(
            IUnitOfWork uk,
            IGenericRepository<Hotel> repository,
            IGenericRepository<Destination> destinationRepository,
            IMapper mapper,
            ILogger<HotelService> logger,
            IValidator<CreateHotelDTO> createValidator,
            IValidator<UpdateHotelDTO> updateValidator)
        {
            _repository = repository;
            _destinationRepository = destinationRepository;
            _mapper = mapper;
            _logger = logger;
            _createValidator = createValidator;
            _updateValidator = updateValidator;
            _uk = uk;
        }


        public async Task<GenericResponse<PaginationModel<HotelDTO>>> GetAllAsync(int pageNumber, int pageSize, bool isActive = false)
        {
            try
            {
                var d = await _repository.GetPaggingByIncludeAsync(pageNumber, pageSize, isActive ? s=>s.IsActive : null, h => h.Destination, h => h.Rooms);
                var res = new PaginationModel<HotelDTO>
                {
                    Data = _mapper.Map<List<HotelDTO>>(d.Data),
                    Page = d.Page,
                    PageSize = d.PageSize,
                    TotalCount = d.TotalCount
                };
                return GenericResponse<PaginationModel<HotelDTO>>.Success(res);
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(HotelService), nameof(GetAllAsync));
                throw;
            }
        }
  

        public async Task<GenericResponse<HotelDTO?>> GetByIdAsync(int id)
        {
            try
            {
                var hotel = await _repository.GetByAsync(h => h.Id == id, h => h.Destination, h => h.Rooms);
                if (hotel == null)
                    return GenericResponse<HotelDTO?>.NotFound($"Hotel with id {id} was not found.");

                return GenericResponse<HotelDTO?>.Success(_mapper.Map<HotelDTO>(hotel));
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(HotelService), nameof(GetByIdAsync));
                throw;
            }
        }

        public async Task<GenericResponse<HotelDTO>> AddAsync(CreateHotelDTO model)
        {
            try
            {
                var validation = await _createValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<HotelDTO>.BadRequest("Invalid hotel data.", validation.Errors.Select(e => e.ErrorMessage));

                var destination = await _destinationRepository.GetByIdAsync(model.DestinationId);
                if (destination == null)
                    return GenericResponse<HotelDTO>.BadRequest($"Destination with id {model.DestinationId} was not found.");

                var entity = _mapper.Map<Hotel>(model);
                entity.IsActive = true;

                await _repository.AddAsync(entity);
                var saved = await _uk.CommitAsync();
                if (!saved)
                    return GenericResponse<HotelDTO>.Failure("Failed to add hotel.");

                _logger.LogInformation("Hotel {Name} created with id {Id}", entity.Name, entity.Id);
                return GenericResponse<HotelDTO>.Success(_mapper.Map<HotelDTO>(entity), "Hotel added successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(HotelService), nameof(AddAsync));
                throw;
            }
        }

        public async Task<GenericResponse<HotelDTO>> UpdateAsync(UpdateHotelDTO model)
        {
            try
            {
                var validation = await _updateValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<HotelDTO>.BadRequest("Invalid hotel data.", validation.Errors.Select(e => e.ErrorMessage));

                var entity = await _repository.GetByIdAsync(model.Id);
                if (entity == null)
                    return GenericResponse<HotelDTO>.NotFound($"Hotel with id {model.Id} was not found.");

                var destination = await _destinationRepository.GetByIdAsync(model.DestinationId);
                if (destination == null)
                    return GenericResponse<HotelDTO>.BadRequest($"Destination with id {model.DestinationId} was not found.");

                _mapper.Map(model, entity);
                await _repository.UpdateAsync(entity);
                var saved = await _uk.CommitAsync();
                if (!saved)
                    return GenericResponse<HotelDTO>.Failure("Failed to update hotel.");

                return GenericResponse<HotelDTO>.Success(_mapper.Map<HotelDTO>(entity), "Hotel updated successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(HotelService), nameof(UpdateAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> ChangeStatusAsync(int id)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Hotel with id {id} was not found.");

                entity.IsActive = !entity.IsActive;
                await _repository.UpdateAsync(entity);
                await _uk.CommitAsync();

                return GenericResponse<bool>.Success(true, $"Hotel status changed to {(entity.IsActive ? "active" : "inactive")}.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(HotelService), nameof(ChangeStatusAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> DeleteAsync(int id)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Hotel with id {id} was not found.");

                await _repository.DeleteAsync(entity);
                await _uk.CommitAsync();
                return GenericResponse<bool>.Success(true, "Hotel deleted successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(HotelService), nameof(DeleteAsync));
                throw;
            }
        }
    }

    public class HotelRoomService : IHotelRoomService
    {
        private readonly IGenericRepository<HotelRoom> _repository;
        private readonly IGenericRepository<Hotel> _hotelRepository;
        private readonly IMapper _mapper;
        private readonly IValidator<CreateHotelRoomDTO> _createValidator;
        private readonly IValidator<UpdateHotelRoomDTO> _updateValidator;
        private readonly IUnitOfWork _uk;
        private readonly ILogger<HotelRoomService> _logger;

        public HotelRoomService(
            IUnitOfWork uk,
            IGenericRepository<HotelRoom> repository,
            IGenericRepository<Hotel> hotelRepository,
            IMapper mapper,
            IValidator<CreateHotelRoomDTO> createValidator,
            IValidator<UpdateHotelRoomDTO> updateValidator,
            ILogger<HotelRoomService> logger)
        {
            _repository = repository;
            _hotelRepository = hotelRepository;
            _mapper = mapper;
            _createValidator = createValidator;
            _updateValidator = updateValidator;
            _uk = uk;
            _logger = logger;
        }

        public async Task<GenericResponse<IList<HotelRoomDTO>>> GetByHotelAsync(int hotelId)
        {
            try
            {
                var rooms = await _repository.GetAllByAsync(r => r.HotelId == hotelId);
                return GenericResponse<IList<HotelRoomDTO>>.Success(_mapper.Map<IList<HotelRoomDTO>>(rooms.ToList()));
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(HotelRoomService), nameof(GetByHotelAsync));
                throw;
            }
        }

        public async Task<GenericResponse<HotelRoomDTO?>> GetByIdAsync(int id)
        {
            try
            {
                var room = await _repository.GetByIdAsync(id);
                if (room == null)
                    return GenericResponse<HotelRoomDTO?>.NotFound($"Hotel room with id {id} was not found.");

                return GenericResponse<HotelRoomDTO?>.Success(_mapper.Map<HotelRoomDTO>(room));
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(HotelRoomService), nameof(GetByIdAsync));
                throw;
            }
        }

        public async Task<GenericResponse<HotelRoomDTO>> AddAsync(CreateHotelRoomDTO model)
        {
            try
            {
                var validation = await _createValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<HotelRoomDTO>.BadRequest("Invalid room data.", validation.Errors.Select(e => e.ErrorMessage));

                var hotel = await _hotelRepository.GetByIdAsync(model.HotelId);
                if (hotel == null)
                    return GenericResponse<HotelRoomDTO>.BadRequest($"Hotel with id {model.HotelId} was not found.");

                var entity = _mapper.Map<HotelRoom>(model);
                entity.IsActive = true;

                await _repository.AddAsync(entity);
                var saved = await _uk.CommitAsync();
                if (!saved)
                    return GenericResponse<HotelRoomDTO>.Failure("Failed to add hotel room.");

                return GenericResponse<HotelRoomDTO>.Success(_mapper.Map<HotelRoomDTO>(entity), "Hotel room added successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(HotelRoomService), nameof(AddAsync));
                throw;
            }
        }

        public async Task<GenericResponse<HotelRoomDTO>> UpdateAsync(UpdateHotelRoomDTO model)
        {
            try
            {
                var validation = await _updateValidator.ValidateAsync(model);
                if (!validation.IsValid)
                    return GenericResponse<HotelRoomDTO>.BadRequest("Invalid room data.", validation.Errors.Select(e => e.ErrorMessage));

                var entity = await _repository.GetByIdAsync(model.Id);
                if (entity == null)
                    return GenericResponse<HotelRoomDTO>.NotFound($"Hotel room with id {model.Id} was not found.");

                _mapper.Map(model, entity);
                await _repository.UpdateAsync(entity);
                var saved = await _uk.CommitAsync();
                return GenericResponse<HotelRoomDTO>.Success(_mapper.Map<HotelRoomDTO>(entity), "Hotel room updated successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(HotelRoomService), nameof(UpdateAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> ChangeStatusAsync(int id)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Hotel room with id {id} was not found.");

                entity.IsActive = !entity.IsActive;
                await _repository.UpdateAsync(entity);
                var saved = await _uk.CommitAsync();
                return GenericResponse<bool>.Success(true, $"Room status changed to {(entity.IsActive ? "active" : "inactive")}.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(HotelRoomService), nameof(ChangeStatusAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> DeleteAsync(int id)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Hotel room with id {id} was not found.");

                await _repository.DeleteAsync(entity);
                var saved = await _uk.CommitAsync();
                return GenericResponse<bool>.Success(true, "Hotel room deleted successfully.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(HotelRoomService), nameof(DeleteAsync));
                throw;
            }
        }
    }
}
