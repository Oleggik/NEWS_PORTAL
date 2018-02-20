using System.Web.Mvc;
using System.Web.Routing;

namespace NewsPortal.Web.App_Start
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.RouteExistingFiles = true;
            routes.MapMvcAttributeRoutes();

            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.IgnoreRoute("api/{*pathInfo}");
            routes.IgnoreRoute("odata/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{*catch-all}",
                defaults: new { controller = "Home", action = "Index" }
            );
        }
    }
}