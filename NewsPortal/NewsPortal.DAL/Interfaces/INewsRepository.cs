using System.Collections.Generic;
using NewsPortal.DAL.Entities;

namespace NewsPortal.DAL.Interfaces
{
    public interface INewsRepository: IRepository<News, int>
    {
        bool CheckUniqueTitle(string value);
        IEnumerable<News> AddRange(List<News> items);
    }
}