using Microsoft.Extensions.Logging;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.Application.Services
{
    public class TourIncludeService : GenericService<TourInclude>, ITourIncludeService
    {
        public TourIncludeService(IGenericRepository<TourInclude> repository, ILogger<TourIncludeService> logger,IUnitOfWork uk)
            : base(repository, logger,uk)
        {
        }
    }
}
