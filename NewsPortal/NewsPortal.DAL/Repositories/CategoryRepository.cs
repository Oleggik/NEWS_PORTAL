using System.Collections.Generic;
using NewsPortal.DAL.EF;
using NewsPortal.DAL.Entities;
using NewsPortal.DAL.Interfaces;
using System.Linq;

namespace NewsPortal.DAL.Repositories
{
    public class CategoryRepository : Repository<Category, int>, ICategoryRepository
    {
        public CategoryRepository(ApplicationContext db) : base(db) { }

        public bool CheckUniqueName(string value)
        {
            return _context.Categories.FirstOrDefault(a => a.Name.Equals(value)) != null;
        }

        public int GetIdByName(string name)
        {
            return _context.Categories.First(a => a.Name.Equals(name)).Id;
        }

        public List<Category> GetAll()
        {
            return _context.Categories.ToList();
        }
    }
}
