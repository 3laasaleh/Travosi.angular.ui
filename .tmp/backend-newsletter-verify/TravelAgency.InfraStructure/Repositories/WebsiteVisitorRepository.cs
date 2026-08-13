using Microsoft.EntityFrameworkCore;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Repositories;
using TravelAgency.InfraStructure.Persistence;

namespace TravelAgency.InfraStructure.Repositories
{
    public class WebsiteVisitorRepository : IWebsiteVisitorRepository
    {
        private readonly TravelAgencyContext _db;

        public WebsiteVisitorRepository(TravelAgencyContext db)
        {
            _db = db;
        }

        public Task<int> CountAsync()
            => _db.WebsiteVisitors.CountAsync();

        public async Task RegisterVisitAsync(
            Guid visitorId,
            DateTime visitedAtUtc)
        {
            var updatedRows = await UpdateExistingVisitorAsync(
                visitorId,
                visitedAtUtc);
            if (updatedRows > 0)
                return;

            var visitor = new WebsiteVisitor
            {
                VisitorId = visitorId,
                FirstVisitedAtUtc = visitedAtUtc,
                LastVisitedAtUtc = visitedAtUtc,
                VisitCount = 1
            };
            _db.WebsiteVisitors.Add(visitor);

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                // A concurrent request may have inserted the same unique visitor first.
                _db.Entry(visitor).State = EntityState.Detached;
                updatedRows = await UpdateExistingVisitorAsync(
                    visitorId,
                    visitedAtUtc);
                if (updatedRows == 0)
                    throw;
            }
        }

        private Task<int> UpdateExistingVisitorAsync(
            Guid visitorId,
            DateTime visitedAtUtc)
            => _db.WebsiteVisitors
                .Where(visitor => visitor.VisitorId == visitorId)
                .ExecuteUpdateAsync(
                    setters => setters
                        .SetProperty(
                            visitor => visitor.LastVisitedAtUtc,
                            visitedAtUtc)
                        .SetProperty(
                            visitor => visitor.VisitCount,
                            visitor => visitor.VisitCount + 1));
    }
}
