using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using TravelAgency.Domain.Models;

namespace TravelAgency.Domain.Repositories
{
    public interface IGenericRepository<T> where T : class
    {
        public Task<IList<T>> GetAllAsync();
        public Task<T?> GetByIdAsync(int Id);
        public Task<T?> GetByAsync(Expression<Func<T, bool>> expression);
        public Task<T?> GetByAsync(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="predicate">
        /// where condition as Expression</param>
        /// <param name="includes">
        /// include as array ofExpression </param>
        /// <returns></returns>
        public Task<IEnumerable<T>> GetAllByAsync(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes);
        public Task<IEnumerable<T>> GetAllByAsync(params Expression<Func<T, object>>[] includes);
        public Task<PaginationModel<T>> GetPaggingByIncludeAsync(int pageNumber, int pageSize, Expression<Func<T, bool>>? predicate, params Expression<Func<T, object>>[] includes);
        public Task<int> CountAsync(Expression<Func<T, bool>>? predicate = null);

        public Task UpdateAsync(T Entity);
        public Task DeleteAsync(T Entity);
        public Task DeleteListAsync(IList<T> entities);
        public Task DeleteAsync(int EntityId);
        public Task AddAsync(T Entity);
        public Task AddListAsync(IList<T> Entity);


    }
}
