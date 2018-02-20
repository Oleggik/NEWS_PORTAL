using Microsoft.AspNet.Identity.EntityFramework;
using NewsPortal.DAL.Entities;
using System.Data.Entity;
using System.Diagnostics;

namespace NewsPortal.DAL.EF
{
    public class ApplicationContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationContext(string connectionString = "DefaultConnection") : base(connectionString)
        {
            Database.Log = x => Debug.Write(x);
        }

        public DbSet<Feed> Feeds { get; set; }

        public DbSet<ClientProfile> ClientProfiles { get; set; }

        public DbSet<News> News { get; set; }

        public DbSet<Category> Categories { get; set; }
    }
}
