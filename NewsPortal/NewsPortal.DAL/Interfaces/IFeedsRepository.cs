using System.Collections.Generic;
using NewsPortal.DAL.Entities;

namespace NewsPortal.DAL.Interfaces
{
    public interface IFeedsRepository : IRepository<Feed, int>
    {
        List<Feed> GetAll();
    }
}
