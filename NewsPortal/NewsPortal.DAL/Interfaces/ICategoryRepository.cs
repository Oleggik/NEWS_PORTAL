using System.Collections.Generic;
using NewsPortal.DAL.Entities;

namespace NewsPortal.DAL.Interfaces
{
    public interface ICategoryRepository: IRepository<Category, int> 
    {
        bool CheckUniqueName(string value);
        int GetIdByName(string name);
        List<Category> GetAll();
    }
}
