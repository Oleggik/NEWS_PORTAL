using Microsoft.AspNet.Identity.EntityFramework;
using NewsPortal.DAL.EF;
using NewsPortal.DAL.Entities;
using NewsPortal.DAL.Identity;
using NewsPortal.DAL.Interfaces;
using System.Threading.Tasks;

namespace NewsPortal.DAL.Repositories
{
    public class IdentityUnitOfWork : IUnitOfWork
    {
        private readonly ApplicationContext _database;
        private readonly ApplicationUserManager _userManager;
        private readonly ApplicationRoleManager _roleManager;
        private readonly IProfileRepository _profileRepository;
        private readonly INewsRepository _newsRepository;
        private readonly IFeedsRepository _feedRepository;
        private readonly ICategoryRepository _categoryRepository;

        public IdentityUnitOfWork(ApplicationContext database, string connectionString = "DefaultConnection")
        {
            _database = database;
            _profileRepository = new ProfileRepository(_database);
            _newsRepository = new NewsRepository(_database);
            _categoryRepository = new CategoryRepository(_database);
            _feedRepository = new FeedsRepository(_database);
            _userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(_database));
            _roleManager = new ApplicationRoleManager(new RoleStore<ApplicationRole>(_database));
        }

        public ApplicationUserManager UserManager => _userManager;

        public ApplicationRoleManager RoleManager => _roleManager;

        public IFeedsRepository FeedRepository => _feedRepository;

        public IProfileRepository ProfileRepository => _profileRepository;

        public INewsRepository NewsRepository => _newsRepository;

        public ICategoryRepository CategoryRepository => _categoryRepository;

        public ApplicationContext Context => _database;

        public async Task SaveAsync()
        {
            await _database.SaveChangesAsync();
        }
    }
}
