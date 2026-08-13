using Microsoft.Extensions.Logging;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.Application.Services
{
    public class TourHighlightService : GenericService<TourHighlight>, ITourHighlightService
    {
        public TourHighlightService(IGenericRepository<TourHighlight> repository, ILogger<TourHighlightService> logger,IUnitOfWork uk)
            : base(repository, logger, uk)
        {
        }
    }
}
