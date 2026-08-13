using AutoMapper;
using Microsoft.Extensions.Logging;
using TravelAgency.Application.DTOs.Notifications;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Enums;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.Application.Services
{
    public class NotificationService : INotificationService
    {
        private readonly IGenericRepository<Notification> _repository;
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _uk;
        private readonly ILogger<NotificationService> _logger;

        public NotificationService(
            IGenericRepository<Notification> repository,
            IMapper mapper,
            IUnitOfWork unitOfWork,
            ILogger<NotificationService> logger)
        {
            _repository = repository;
            _mapper = mapper;
            _uk = unitOfWork;
            _logger = logger;
        }

        public async Task<GenericResponse<IList<NotificationDTO>>> GetMyAsync(int userId, bool unreadOnly)
        {
            try
            {
                var notifications = await _repository.GetAllByAsync(
                    n => n.UserId == userId && (!unreadOnly || !n.IsRead));

                var ordered = notifications.OrderByDescending(n => n.CreatedDate).ToList();
                return GenericResponse<IList<NotificationDTO>>.Success(_mapper.Map<IList<NotificationDTO>>(ordered));
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(NotificationService), nameof(GetMyAsync));
                throw;
            }
        }

        public async Task<GenericResponse<int>> GetUnreadCountAsync(int userId)
        {
            try
            {
                var notifications = await _repository.GetAllByAsync(n => n.UserId == userId && !n.IsRead);
                return GenericResponse<int>.Success(notifications.Count());
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(NotificationService), nameof(GetUnreadCountAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> MarkAsReadAsync(int id, int userId)
        {
            try
            {
                var entity = await _repository.GetByIdAsync(id);
                if (entity == null)
                    return GenericResponse<bool>.NotFound($"Notification with id {id} was not found.");

                if (entity.UserId != userId)
                    return GenericResponse<bool>.Unauthorized("You can only update your own notifications.");

                if (!entity.IsRead)
                {
                    entity.IsRead = true;
                    await _repository.UpdateAsync(entity);
                    await _uk.CommitAsync();
                }

                return GenericResponse<bool>.Success(true, "Notification marked as read.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(NotificationService), nameof(MarkAsReadAsync));
                throw;
            }
        }

        public async Task<GenericResponse<bool>> MarkAllAsReadAsync(int userId)
        {
            try
            {
                var notifications = (await _repository.GetAllByAsync(n => n.UserId == userId && !n.IsRead)).ToList();
                foreach (var n in notifications)
                {
                    n.IsRead = true;
                    await _repository.UpdateAsync(n);
                }
                if (notifications.Count > 0)
                    await _uk.CommitAsync();

                return GenericResponse<bool>.Success(true, $"{notifications.Count} notification(s) marked as read.");
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(NotificationService), nameof(MarkAllAsReadAsync));
                throw;
            }
        }

        public async Task CreateAsync(int userId, string title, string message, NotificationTypeEnum type, int? relatedEntityId = null)
        {
            try
            {
                var notification = new Notification
                {
                    UserId = userId,
                    Title = title,
                    Message = message,
                    Type = type,
                    RelatedEntityId = relatedEntityId,
                    IsRead = false,
                    CreatedDate = DateTime.UtcNow
                };

                await _repository.AddAsync(notification);
                await _uk.CommitAsync();
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(NotificationService), nameof(CreateAsync));
                throw;
            }
        }
    }
}
