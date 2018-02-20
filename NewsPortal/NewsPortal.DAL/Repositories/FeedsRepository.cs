using System.Collections.Generic;
using System.Linq;
using NewsPortal.DAL.EF;
using NewsPortal.DAL.Entities;
using NewsPortal.DAL.Interfaces;

namespace NewsPortal.DAL.Repositories
{
    class FeedsRepository : Repository<Feed, int>, IFeedsRepository
    {
        public FeedsRepository(ApplicationContext db) : base(db) { }

        public List<Feed> GetAll()
        {
            return _context.Feeds.ToList();
        }
    }
}
