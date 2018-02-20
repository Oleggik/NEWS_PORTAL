using System.Collections.Generic;
using NewsPortal.DAL.EF;
using NewsPortal.DAL.Entities;
using NewsPortal.DAL.Interfaces;
using System.Linq;

namespace NewsPortal.DAL.Repositories
{
    public class NewsRepository : Repository<News, int>, INewsRepository
    {
        public NewsRepository(ApplicationContext db) : base(db) { }

        public bool CheckUniqueTitle(string value)
        {
            return _context.News.FirstOrDefault(a => a.Title.Equals(value)) != null;
        }

        public IEnumerable<News> AddRange(List<News> items)
        {
            IEnumerable<News> news = _context.News.AddRange(items);
            _context.SaveChanges();
            return news;
        }
    }
}