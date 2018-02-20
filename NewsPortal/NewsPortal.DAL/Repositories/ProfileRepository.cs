using System.Collections.Generic;
using System.Linq;
using NewsPortal.DAL.EF;
using NewsPortal.DAL.Entities;
using NewsPortal.DAL.Interfaces;

namespace NewsPortal.DAL.Repositories
{
    public class ProfileRepository : Repository<ClientProfile, string>, IProfileRepository
    {
        public ProfileRepository(ApplicationContext db) : base(db) { }

        public List<string> GetAllUsersId()
        {
            return _context.Users.Select(a => a.Id).ToList();
        }
    }
}
