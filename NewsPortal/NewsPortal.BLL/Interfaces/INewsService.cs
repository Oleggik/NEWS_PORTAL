using System.Collections.Generic;
using NewsPortal.BLL.DTO;
using NewsPortal.DAL.Entities;
using System.Linq;
using System.Threading.Tasks;

namespace NewsPortal.BLL.Interfaces
{
    public interface INewsService : IService<NewsDto, int>
    {
        IQueryable<News> Query();
        bool CheckUniqueTitle(string value);
        IEnumerable<NewsDto> AddRange(List<NewsDto> items);
        List<NewsDto> GetAll();
    }
}
