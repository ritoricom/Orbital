using System.Text.Json.Serialization;
using Api.Extensions;
using BnovoIntegration;
using BnovoIntegration.Extensions;
using Core.Models;
using Core.Options;
using EmailSender.Extensions;
using EmailSender.Models;
using Entities.Enums;
using WebDavImageService.Extensions;
using WebDavImageService.Models;

namespace Api;

/// <summary/>
public class Startup
{
    /// <summary/>
    private readonly IConfiguration _configuration;
    
    /// <summary/>
    public Startup(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    /// <summary/>
    public void ConfigureServices(IServiceCollection services)
    {
        var connectionString = _configuration.GetConnectionString("DefaultConnection");

        services.AddDbContextConfiguration(connectionString);

        services.AddServicesConfiguration();

        var authOptions = _configuration.GetSection("AuthOptions").Get<AuthOptions>();
        
        services.AddAuthConfiguration(authOptions);
        
        var admin = _configuration.GetSection("UserSeedParameters").Get<UserSeedParameters>();

        services.AddSingleton(admin);

        var imageUrlBase = _configuration.GetSection("ImageServiceOptions:ImageUrlBase").Value;
        
        services.AddImageServiceConfiguration(imageUrlBase);
        
        var htmlTemplatePath = _configuration.GetSection("HtmlTemplateOptions").Get<HtmlTemplateOptions>();

        services.AddSingleton(htmlTemplatePath);
        
        var mailOptions = _configuration.GetSection("MailOptions").Get<MailKitOptions>();

        services.AddMailKitSender(mailOptions);
        
        var bnovoOptions = _configuration.GetSection("BnovoOptions").Get<BnovoOptions>();
        
        var accountsIds = _configuration.GetSection("AccountIds").Get<Dictionary<City, int>>();

        services.AddBnovoConfiguration(bnovoOptions);

        var webDavOptions = _configuration.GetSection("WebdavOptions").Get<WebDavOptions>();
        
        services.AddWebDavConfiguration(webDavOptions);
        
        services.AddSingleton(accountsIds);
        
        var synchronizeCronSchedule = _configuration.GetSection("SynchronizeCronSchedule").Get<string>();
        var imageAutoDeleteCronSchedule = _configuration.GetSection("ImageAutoDeleteCronSchedule").Get<string>();
        
        services.AddQuartzConfiguration(synchronizeCronSchedule, imageAutoDeleteCronSchedule);
        
        services.AddSwaggerConfiguration();

        services.AddControllers()
            .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(System.Text.Json.JsonNamingPolicy.CamelCase));
                    options.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
                }
            );
    }

    /// <summary/>
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        app.UseErrorHandler();
        
        app.UseSwaggerOptions();
        
        app.UseRouting();
        
        app.UseCors(options => options
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());
        
        app.UseAuthentication();
        app.UseAuthorization();
        
        app.UseClaimsCheck();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapGet("/", context =>
            {
                context.Response.Redirect("docs", permanent: false);
                return Task.CompletedTask;
            });
            endpoints.MapControllers();
        });
    }
}