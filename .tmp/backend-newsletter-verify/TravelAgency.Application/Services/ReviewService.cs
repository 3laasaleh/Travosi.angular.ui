using Microsoft.Extensions.Logging;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.Application.Services
{
    public class ReviewService : GenericService<Review>, IReviewService
    {
        public ReviewService(IGenericRepository<Review> repository, ILogger<ReviewService> logger,IUnitOfWork uk)
            : base(repository, logger,uk)
        {
        }
    }
}
