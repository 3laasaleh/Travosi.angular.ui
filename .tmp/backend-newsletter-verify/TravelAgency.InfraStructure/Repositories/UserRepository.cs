using Microsoft.EntityFrameworkCore;
using TravelAgency.Domain.Entities;
using TravelAgency.Domain.Enums;
using TravelAgency.Domain.Repositories;
using TravelAgency.InfraStructure.Persistence;

namespace TravelAgency.InfraStructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly TravelAgencyContext _db;
        public UserRepository(TravelAgencyContext context)
        {
            _db = context;
        }

        public async Task<User?> GetUserByMobileAsync(string Mobile, CancellationToken cancellationToken)
        {

            return await _db.Users.SingleOrDefaultAsync(s => s.Mobile == null ? false : s.Mobile.ToLower() == Mobile.ToLower(),cancellationToken);
        }

        public async Task<User?> GetUserByEmailAsync(string email,CancellationToken cancellationToken)
        {
            return await _db.Users.SingleOrDefaultAsync(s => s.Email == null ? false : s.Email.ToLower() == email.ToLower(), cancellationToken);
        }
        public async Task<User?> GetUserByIdAsync(int userId, CancellationToken cancellationToken)
        {
            return await _db.Users.SingleOrDefaultAsync(user => user.Id == userId, cancellationToken);
        }
        public async Task<User?> AddUserAsync(User user, CancellationToken cancellationToken)
        {

            await _db.Users.AddAsync(user, cancellationToken);
            await _db.SaveChangesAsync(cancellationToken);
            return user;
        }

        public async Task AddAccountAsync(User user, Customer customer, CancellationToken cancellationToken)
        {
            await using var transaction = await _db.Database.BeginTransactionAsync(cancellationToken);
            try
            {
                await _db.Users.AddAsync(user, cancellationToken);
                await _db.Customers.AddAsync(customer, cancellationToken);
                await _db.SaveChangesAsync(cancellationToken);
                await transaction.CommitAsync(cancellationToken);
            }
            catch
            {
                await transaction.RollbackAsync(cancellationToken);
                throw;
            }
        }

        public async Task<User?> UpdateUserPasswordAsync(User userModel, CancellationToken cancellationToken)
        {
            await _db.Users.Where(b => b.Id == userModel.Id).ExecuteUpdateAsync(user => user.SetProperty(b => b.Password_Hashed, userModel.Password_Hashed).SetProperty(s => s.SaltKey, userModel.SaltKey),cancellationToken);
            await _db.SaveChangesAsync(cancellationToken);
            return userModel;
        }

        public async Task<IList<User>> GetUsersByRoleAsync(UserRoleEnum role, CancellationToken cancellationToken)
        {
            return await _db.Users.Where(u => u.Role == role).OrderBy(u => u.FirstName).ThenBy(u => u.LastName).ToListAsync(cancellationToken);
        }

        public async Task ActivateAccountAsync(int userId, CancellationToken cancellationToken)
        {
            await _db.Users.Where(b => b.Id == userId).ExecuteUpdateAsync(user => user.SetProperty(b => b.IsActivated, true), cancellationToken);
            await _db.SaveChangesAsync(cancellationToken);
          
        }

        public async Task UpdateProfileImageAsync(int userId, string? imageUrl, CancellationToken cancellationToken)
        {
            await _db.Users
                .Where(user => user.Id == userId)
                .ExecuteUpdateAsync(
                    update => update.SetProperty(user => user.ProfileImageUrl, imageUrl),
                    cancellationToken);
            await _db.SaveChangesAsync(cancellationToken);

        }

    }
}
