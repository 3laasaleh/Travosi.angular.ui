using System;
using System.Collections.Generic;
using System.Text;

namespace TravelAgency.Domain.Repositories
{
    public interface IUnitOfWork
    {
        Task<bool> CommitAsync(CancellationToken cancellationToken = default);
    }
}
