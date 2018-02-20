using System.Data.Entity.Infrastructure;

namespace NewsPortal.DAL.EF
{
    public class ApplicationContextFactory : IDbContextFactory<ApplicationContext>
    {
        public ApplicationContext Create()
        {
            return new ApplicationContext("DefaultConnection");
        }
    }
}
