using System.Collections.Generic;
using NewsPortal.DAL.Entities;

namespace NewsPortal.DAL.Interfaces
{
    public interface IProfileRepository : IRepository<ClientProfile, string>
    {
        List<string> GetAllUsersId();
    }
}
