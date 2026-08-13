using System;
using System.Collections.Generic;
using System.Text;
using TravelAgency.Domain.Repositories;
using TravelAgency.InfraStructure.Persistence;

namespace TravelAgency.InfraStructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly TravelAgencyContext _context;

        public UnitOfWork(TravelAgencyContext context)
        {
            _context = context;
        }

        public async Task<bool> CommitAsync(CancellationToken cancellationToken = default)
        {
            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }
    }
}
