using AutoMapper;
using NewsPortal.BLL.Services;
using NewsPortal.DAL.EF;
using NewsPortal.Web.Util;

namespace NewsPortal.MSSQLtoElastic
{
    class Program
    {
        private static readonly string _connectionString = "DefaultConnection";

        static void Main(string[] args)
        {
            ServiceCreator creator = new ServiceCreator(
                new ApplicationContext(),
                new Mapper(new MapperConfiguration(cfg =>
                {
                    cfg.AddProfile(new AutoMapperProfile());
                }))
            );

            var repo = new ElasticRepository(
                creator.CreateCategorieService(_connectionString),
                creator.CreateNewsService(_connectionString),
                creator.CreateUserService(_connectionString)
            );

            repo.SaveDocumentToElasticsearch().GetAwaiter().GetResult();
        }
    }
}
