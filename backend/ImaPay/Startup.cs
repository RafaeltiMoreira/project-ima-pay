﻿
namespace System
{
    public class Startup
    {

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
          

            services.AddSingleton<IConfiguration>(Configuration);

            
        }
    }
}
