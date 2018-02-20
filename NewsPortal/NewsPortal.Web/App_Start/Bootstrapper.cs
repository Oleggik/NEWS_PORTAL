using NewsPortal.Web.Util;
using System.Web.Http;

namespace NewsPortal.Web.App_Start
{
    public class Bootstrapper
    {
        public static void Run()
        {
            AutofacWebapiConfig.Initialize(GlobalConfiguration.Configuration);
        }

    }
}