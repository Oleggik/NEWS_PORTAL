using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace NewsPortal.DAL.Interfaces
{
    public interface IRepository<TEntity, TKey> where TEntity : class
    {
        IQueryable<TEntity> Query();

        IEnumerable<TEntity> Get(Func<TEntity, bool> predicate);

        Task<TEntity> Create(TEntity item);

        Task<TEntity> GetById(TKey id);

        Task<TEntity> Remove(TKey id);

        Task<TEntity> Update(TEntity item);

        IEnumerable<TEntity> GetWithInclude(params Expression<Func<TEntity, object>>[] includeProperties);

        IEnumerable<TEntity> GetWithInclude(Func<TEntity, bool> predicate, params Expression<Func<TEntity, object>>[] includeProperties);

    }
}
