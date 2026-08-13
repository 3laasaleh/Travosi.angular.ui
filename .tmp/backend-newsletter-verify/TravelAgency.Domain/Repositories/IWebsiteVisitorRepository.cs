namespace TravelAgency.Domain.Repositories
{
    public interface IWebsiteVisitorRepository
    {
        Task RegisterVisitAsync(
            Guid visitorId,
            DateTime visitedAtUtc);
        Task<int> CountAsync();
    }
}
