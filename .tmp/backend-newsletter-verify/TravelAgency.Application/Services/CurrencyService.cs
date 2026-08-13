using Microsoft.Extensions.Logging;
using TravelAgency.Application.Interfaces;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Repositories;

namespace TravelAgency.Application.Services
{
    public class CurrencyService : GenericService<Currency>, ICurrencyService
    {
        public CurrencyService(IGenericRepository<Currency> repository, ILogger<CurrencyService> logger, IUnitOfWork uk)
            : base(repository, logger, uk)
        {
        }
    }
}
