using System.Collections.Generic;
using NewsPortal.BLL.DTO;

namespace NewsPortal.BLL.Interfaces
{
    public interface IFeederService : IService<FeedDto, int>
    {
        List<FeedDto> GetAll();
    }
}
