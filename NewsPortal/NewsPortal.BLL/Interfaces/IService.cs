using System.Threading.Tasks;

namespace NewsPortal.BLL.Interfaces
{
    public interface IService<T, TK>
    {
        Task<T> Create(T item);
        Task<T> GetById(TK id);
        Task<T> Remove(TK id);
        Task<T> Update(T item);
    }
}
