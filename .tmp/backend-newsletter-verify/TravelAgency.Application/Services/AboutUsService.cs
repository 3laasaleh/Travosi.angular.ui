using Microsoft.Extensions.Logging;
using TravelAgency.Application.DTOs.AboutUs;
using TravelAgency.Application.DTOs.User;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.Application.Services
{
    public class AboutUsService : IAboutUsService
    {
        private readonly IWebsiteVisitorRepository _visitorRepository;
        private readonly IGenericRepository<Package> _packageRepository;
        private readonly ILogger<AboutUsService> _logger;

        public AboutUsService(
            IWebsiteVisitorRepository visitorRepository,
            IGenericRepository<Package> packageRepository,
            ILogger<AboutUsService> logger)
        {
            _visitorRepository = visitorRepository;
            _packageRepository = packageRepository;
            _logger = logger;
        }

        public async Task<GenericResponse<AboutUsStatisticsDTO>> GetStatisticsAsync()
        {
            try
            {
                var totalVisitors = await _visitorRepository.CountAsync();
                var totalPackages = await _packageRepository.CountAsync(
                    package => package.IsActive);

                return GenericResponse<AboutUsStatisticsDTO>.Success(new AboutUsStatisticsDTO
                {
                    TotalVisitors = totalVisitors,
                    TotalPackages = totalPackages
                });
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(AboutUsService), nameof(GetStatisticsAsync));
                throw;
            }
        }

        public async Task<GenericResponse<int>> RegisterVisitorAsync(Guid visitorId)
        {
            try
            {
                if (visitorId == Guid.Empty)
                    return GenericResponse<int>.BadRequest("A valid visitor ID is required.");

                await _visitorRepository.RegisterVisitAsync(
                    visitorId,
                    DateTime.UtcNow);
                var totalVisitors = await _visitorRepository.CountAsync();
                return GenericResponse<int>.Success(totalVisitors);
            
            }
            catch (Exception exception)
            {
                _logger.LogError(exception, "Unhandled error in {Service}.{Method}", nameof(AboutUsService), nameof(RegisterVisitorAsync));
                throw;
            }
        }
    }
}
