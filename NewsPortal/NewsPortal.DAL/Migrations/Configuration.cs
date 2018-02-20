using NewsPortal.DAL.EF;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity.Migrations;
using NewsPortal.DAL.Entities;
using NewsPortal.DAL.Identity;

namespace NewsPortal.DAL.Migrations
{
    internal sealed class Configuration : DbMigrationsConfiguration<EF.ApplicationContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(ApplicationContext context)
        {
            ApplicationUserManager userMngr = new ApplicationUserManager(new UserStore<ApplicationUser>(context));
            ApplicationRoleManager roleMgr = new ApplicationRoleManager(new RoleStore<ApplicationRole>(context));

           
            roleMgr.Create(new ApplicationRole { Name = "admin" });

            ClientProfile profile = new ClientProfile
            {
                Address = "ул. Мирошниченко д.11",
                Name = "Парфенович Олег Викторович"
            };

            userMngr.Create(new ApplicationUser
            {
                Email = "oleggik97@gmail.com",
                UserName = "oleggik97@gmail.com",
                ClientProfile = profile
            }, "qaz12345faq");

            ApplicationUser user = userMngr.FindByName("oleggik97@gmail.com");

            if (!userMngr.IsInRole(user.Id, "admin"))
            {
                userMngr.AddToRole(user.Id, "admin");
            }

            context.Feeds.Add(new Feed
            {
                Link = "https://lenta.ru/rss/news"
            });

            context.Feeds.Add(new Feed
            {
                Link = "http://avtoesworld.ru/feed/"
            });

            base.Seed(context);
        }
    }
}
