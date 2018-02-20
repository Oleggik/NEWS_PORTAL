using System.Collections.Generic;
using NewsPortal.BLL.DTO;
using NewsPortal.BLL.Infastructure;
using System.Security.Claims;
using System.Threading.Tasks;

namespace NewsPortal.BLL.Interfaces
{
    public interface IUserService
    {
        Task<string> GetUserId(string name);
        Task<OperationDetails> Create(UserDto userDto);
        Task<ClaimsIdentity> Authenticate(UserDto userDto);
        Task<bool> UserInRole(string userName, string roleName);
        List<string> GetAllUsersIds();
        Task<string> GetUserNameById(string id);
    }
}
