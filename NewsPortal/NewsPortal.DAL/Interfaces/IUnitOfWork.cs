using NewsPortal.DAL.EF;
using NewsPortal.DAL.Identity;
using System.Threading.Tasks;

namespace NewsPortal.DAL.Interfaces
{
    public interface IUnitOfWork
    {
        ApplicationUserManager UserManager { get; }
        IProfileRepository ProfileRepository { get; }
        ApplicationRoleManager RoleManager { get; }
        INewsRepository NewsRepository { get; }
        ICategoryRepository CategoryRepository { get; }
        IFeedsRepository FeedRepository { get; }
        ApplicationContext Context { get; }
        Task SaveAsync();
    }
}
