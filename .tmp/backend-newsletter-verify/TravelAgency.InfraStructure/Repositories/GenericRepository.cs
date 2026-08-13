using Microsoft.EntityFrameworkCore;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System.Linq.Expressions;
using TravelAgency.Application.DTOs;
using TravelAgency.Domain.Models;
using TravelAgency.Domain.Repositories;
using TravelAgency.InfraStructure.Persistence;

namespace TravelAgency.InfraStructure.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        private readonly TravelAgencyContext _db;
        private readonly DbSet<T> _dbSet;
        public GenericRepository(TravelAgencyContext Db)
        {
            _db = Db;
            _dbSet = _db.Set<T>();
        }
        public async Task AddAsync(T Entity)
        {
            await _dbSet.AddAsync(Entity);

        }
        public async Task DeleteAsync(int EntityId)
        {
            var entity = await GetByIdAsync(EntityId);
            if (entity == null)
                return;

            _dbSet.Remove(entity);
        }

        public async Task DeleteAsync(T Entity)
        {
            _dbSet.Remove(Entity);
        }

        public async Task DeleteListAsync(IList<T> entities)
        {
            _dbSet.RemoveRange(entities);
        }

        public async Task<IList<T>> GetAllAsync()
        {
            return await _dbSet.AsNoTracking().ToListAsync();
        }

        public async Task<int> CountAsync(Expression<Func<T, bool>>? predicate = null)
        {
            return predicate == null
                ? await _dbSet.AsNoTracking().CountAsync()
                : await _dbSet.AsNoTracking().CountAsync(predicate);
        }

        public async Task<T?> GetByAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.FirstOrDefaultAsync(predicate);

        }
        public async Task<T?> GetByAsync(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _dbSet;
            foreach (var include in includes)
            {
                query = query.Include(include);
            }
            return await query.AsSplitQuery().FirstOrDefaultAsync(predicate);

        }
        public async Task<IEnumerable<T>> GetAllByAsync(params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _dbSet.AsNoTracking() ;
            foreach (var include in includes)
            {
                query = query.Include(include);
            }
            return await query.AsSplitQuery().ToListAsync();

        }
        public async Task<PaginationModel<T>> GetPaggingByIncludeAsync(int pageNumber, int pageSize, Expression<Func<T, bool>>? predicate, params Expression<Func<T, object>>[] includes)
        {
            if (pageNumber < 1)
                pageNumber = 1;
            int skip = (pageNumber - 1) * pageSize;
            IQueryable<T> query = _dbSet.AsNoTracking();
   
            if (predicate != null)
                query= query.Where(predicate);


            var totalCount = await query.CountAsync();

            query = query
                     .Skip(skip)
                     .Take(pageSize);

            foreach (var include in includes)
            {
                query = query.Include(include);
            }
            var data = await query
             .AsSplitQuery()
                 .ToListAsync();
            return new PaginationModel<T>
            {
                Page = pageNumber,
                PageSize = pageSize,
                TotalCount = totalCount,
                Data = data
            };


        }

        
        public async Task<IEnumerable<T>> GetAllByAsync(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _dbSet.AsNoTracking();
            foreach (var include in includes)
            {
                query = query.AsSplitQuery().Include(include);
            }
            return await query.Where(predicate).ToListAsync();

        }
        public async Task<T?> GetByIdAsync(int Id)
        {
            return await _dbSet.FindAsync(Id);
        }

      

        public async Task UpdateAsync(T Entity)
        {
            _dbSet.Update(Entity);
        }

        public async Task AddListAsync(IList<T> data)
        {
            await _dbSet.AddRangeAsync(data);
        }

 
    }
}
