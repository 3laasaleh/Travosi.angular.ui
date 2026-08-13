using TravelAgency.Domain.Entities;


namespace TravelAgency.Domain.Repositories
{
    public interface IUserRepository
    {

        public Task<User?> GetUserByMobileAsync(string emailOrMobile, CancellationToken cancellationToken);
        public Task<User?> GetUserByEmailAsync(string email, CancellationToken cancellationToken);
        public Task<User?> GetUserByIdAsync(int userId, CancellationToken cancellationToken);
        public Task<User?> AddUserAsync(User user, CancellationToken cancellationToken);
        public Task AddAccountAsync(User user, Customer customer, CancellationToken cancellationToken);
        public Task<User?> UpdateUserPasswordAsync(User user, CancellationToken cancellationToken);

        public Task ActivateAccountAsync(int userId, CancellationToken cancellationToken);
        public Task UpdateProfileImageAsync(int userId, string? imageUrl, CancellationToken cancellationToken);
        public Task<IList<User>> GetUsersByRoleAsync(Enums.UserRoleEnum role, CancellationToken cancellationToken);
    }
}
