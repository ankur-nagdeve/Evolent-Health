using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ContactMgmtWebAPI.Startup))]
namespace ContactMgmtWebAPI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
