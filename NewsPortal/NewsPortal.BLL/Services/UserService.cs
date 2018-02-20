using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Identity;
using NewsPortal.DAL.Entities;
using NewsPortal.DAL.Interfaces;
using NewsPortal.BLL.DTO;
using NewsPortal.BLL.Infastructure;
using NewsPortal.BLL.Interfaces;
using System.Security.Claims;
using System.Threading.Tasks;

namespace NewsPortal.BLL.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _database;

        public UserService(IUnitOfWork unitOfWork)
        {
            _database = unitOfWork;
        }

        public async Task<bool> UserInRole(string userName, string roleName)
        {
            return await _database.UserManager.IsInRoleAsync(await GetUserId(userName), roleName);
        }

        public async Task<string> GetUserNameById(string id)
        {
            return (await _database.ProfileRepository.GetById(id)).Name;
        }

        public List<string> GetAllUsersIds()
        {
            return _database.UserManager.Users.Select(a => a.Id).ToList();
        }

        public async Task<OperationDetails> Create(UserDto item)
        {
            OperationDetails resultOperation = null;
            string userId = await RegistrationUser(item.Email, item.Password);
            if (userId != string.Empty)
            {
                await _database.UserManager.AddToRoleAsync(userId, item.Role);
                await CreateProfileForUser(userId, item.Name, item.Address);
                await _database.SaveAsync();
                resultOperation = new OperationDetails(true, string.Empty, string.Empty);
            }
            else
            {
                resultOperation = new OperationDetails(false, string.Empty, string.Empty);
            }
            return resultOperation;
        }

        public async Task<ClaimsIdentity> Authenticate(UserDto item)
        {
            ClaimsIdentity claim = null;
            ApplicationUser user = await _database.UserManager.FindAsync(item.Email, item.Password);
            if (user != null)
            {
                claim = await _database.UserManager.CreateIdentityAsync(user, DefaultAuthenticationTypes.ApplicationCookie);
            }
            return claim;
        }

        public async Task<string> GetUserId(string name)
        {
            return (await _database.UserManager.FindByNameAsync(name)).Id;
        }

        private async Task<string> RegistrationUser(string email, string password)
        {
            string userId = string.Empty;
            ApplicationUser user = await _database.UserManager.FindByEmailAsync(email);
            if (user == null)
            {
                user = new ApplicationUser { Email = email, UserName = email };
                var result = await _database.UserManager.CreateAsync(user, password);
                userId = result.Succeeded ? user.Id : string.Empty;
            }
            return userId;
        }

        private async Task CreateProfileForUser(string userId, string name, string address)
        {
            ClientProfile clientProfile = new ClientProfile
            {
                Id = userId,
                Address = address,
                Name = name
            };
            await _database.ProfileRepository.Create(clientProfile);
        }
    }
}
