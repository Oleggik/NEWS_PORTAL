using Autofac;
using Autofac.Integration.Mvc;
using Autofac.Integration.WebApi;
using Microsoft.Owin.Security;
using NewsPortal.BLL.Interfaces;
using NewsPortal.BLL.Services;
using NewsPortal.DAL.Interfaces;
using NewsPortal.DAL.Repositories;
using NewsPortal.Web.Attributes;
using System;
using System.Configuration;
using System.Reflection;
using System.Web;
using System.Web.Http;
using AutoMapper;
using Elasticsearch.Net;
using NewsPortal.BLL.MessageQueue;
using NewsPortal.DAL.EF;
using NServiceBus;

namespace NewsPortal.Web.Util
{
    public class AutofacWebapiConfig
    {
        private static IContainer _container;

        public static void Initialize(HttpConfiguration config)
        {
            Initialize(config, RegisterServices(new ContainerBuilder()));
        }

        private static void Initialize(HttpConfiguration config, IContainer container)
        {
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }

        private static IContainer RegisterServices(ContainerBuilder builder)
        {
            var settings = new ConnectionConfiguration(new Uri(ConfigurationManager.AppSettings["ElasticServer"])).RequestTimeout(TimeSpan.FromMinutes(2));
            var endPointMsmqName = ConfigurationManager.AppSettings["MSMQName"];
            var queueName = ConfigurationManager.AppSettings["QueueName"];

            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            builder.Register(ctx => new ElasticLowLevelClient(settings)).As<IElasticLowLevelClient>().InstancePerRequest();

            builder.Register(ctx => new SenderToQueueElasticUpdate(new EndpointConfiguration(endPointMsmqName), queueName)).As<ISenderToQueueElasticUpdate>().InstancePerRequest();

            builder.RegisterType<IdentityUnitOfWork>().As<IUnitOfWork>().InstancePerRequest();
            builder.RegisterType<NewsService>().As<INewsService>().InstancePerRequest();
            builder.RegisterType<UserService>().As<IUserService>().InstancePerRequest();
            builder.RegisterType<CategoryService>().As<ICategoryService>().InstancePerRequest();
            builder.RegisterType<FeederService>().As<IFeederService>().InstancePerRequest();
            builder.RegisterType<ElasticService>().As<IElasticService>().InstancePerRequest();

            builder.RegisterType<ElasticRepository>().As<IElasticRepository>().InstancePerRequest();

            builder.Register(ctx => new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfile());
            }));

            builder.Register(ctx => ctx.Resolve<MapperConfiguration>().CreateMapper()).As<IMapper>();

            builder.RegisterType<ApplicationContext>().InstancePerRequest();

            builder.Register(c => HttpContext.Current.GetOwinContext().Authentication).As<IAuthenticationManager>();

            builder.RegisterType<UniqueTitleNews>().PropertiesAutowired();
            builder.RegisterType<UniqueCategoryName>().PropertiesAutowired();

            builder.RegisterAssemblyTypes(AppDomain.CurrentDomain.GetAssemblies())
                                      .Where(t => t.GetCustomAttribute<UniqueCategoryName>() != null)
                                      .AsImplementedInterfaces()
                                      .InstancePerRequest();

            builder.RegisterWebApiFilterProvider(GlobalConfiguration.Configuration);
            builder.RegisterFilterProvider();

            _container = builder.Build();
            return _container;
        }
    }
}