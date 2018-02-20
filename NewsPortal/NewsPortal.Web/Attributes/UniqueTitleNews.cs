using Autofac.Integration.WebApi;
using NewsPortal.BLL.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.Web.Http;
using System.Web.Http.Dependencies;

namespace NewsPortal.Web.Attributes
{
    public class UniqueTitleNews : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            var dependencyResolver = (AutofacWebApiDependencyResolver)GlobalConfiguration.Configuration.DependencyResolver;
            using (IDependencyScope lifetimeScope = dependencyResolver.BeginScope())
            {
                INewsService newsService = (INewsService)(lifetimeScope.GetService(typeof(INewsService)));

                if (value != null && (value is string))
                {
                    return !newsService.CheckUniqueTitle(value.ToString());
                }
                return false;
            }
        }
    }
}