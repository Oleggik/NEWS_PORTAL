using Autofac.Integration.WebApi;
using NewsPortal.BLL.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.Web.Http;
using System.Web.Http.Dependencies;

namespace NewsPortal.Web.Attributes
{
    public class UniqueCategoryName : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            var dependencyResolver = (AutofacWebApiDependencyResolver)GlobalConfiguration.Configuration.DependencyResolver;
            using (IDependencyScope lifetimeScope = dependencyResolver.BeginScope())
            {
                ICategoryService categoryService = (ICategoryService)(lifetimeScope.GetService(typeof(ICategoryService)));
                
                if (value != null && (value is string))
                {
                    return !categoryService.CheckUniqueName(value.ToString());
                }
            }


            return false;
        }
    }
}