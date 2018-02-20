using System.Collections.Generic;
using NewsPortal.BLL.DTO;
using NewsPortal.DAL.Entities;
using System.Linq;
using System.Threading.Tasks;

namespace NewsPortal.BLL.Interfaces
{
    public interface ICategoryService : IService<CategoryDto, int>
    {
        IQueryable<Category> Query();
        bool CheckUniqueName(string value);
        List<CategoryDto> GetAll();
        int GetIdByName(string value);
        int NewsCountByCategory(int id);
    }
}
