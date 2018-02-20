using AutoMapper;
using NewsPortal.BLL.Services;
using NewsPortal.DAL.EF;

namespace NewsPortal.NewsFeeder
{
    class Program
    {
        private static readonly string _connectionString = "DefaultConnection";

        static void Main(string[] args)
        {
            AutomapperConfig.Configure();
            Logger.InitLogger();

            ServiceCreator creator = new ServiceCreator(
                new ApplicationContext(),
                new Mapper(new MapperConfiguration(cfg =>
                    {
                        cfg.AddProfile(new AutoMapperProfile());
                    }))
                );

            RSSFeeder feeder = new RSSFeeder(
                new RemoteLoaderFeed(), 
                creator.CreateCategorieService(_connectionString), 
                creator.CreateNewsService(_connectionString),
                creator.CreateFeederService(_connectionString),
                creator.CreateUserService(_connectionString));

            feeder.Run().GetAwaiter().GetResult();
        }
    }
}
