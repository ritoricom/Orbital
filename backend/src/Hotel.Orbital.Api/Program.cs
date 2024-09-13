using Api.Extensions;

namespace Api;

/// <summary/>
public class Program
{
    /// <summary/>
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().MigrateDatabase().SeedData().Run();
    }
    
    /// <summary/>
    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
}