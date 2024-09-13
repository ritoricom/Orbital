using System.Reflection;
using System.Text;
using Api.Validators;
using Core.Interfaces;
using Core.Jobs;
using Core.Models;
using Core.Options;
using Core.Profiles;
using Core.Services;
using FluentValidation;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Quartz;

namespace Api.Extensions;

/// <summary>
/// Методы расширения для <see cref="IServiceCollection"/>
/// </summary>
public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Добавление конфигурации подключения к БД
    /// </summary>
    /// <param name="services">Коллекция сервисов</param>
    /// <param name="connectionString">Строка подключения</param>
    public static void AddDbContextConfiguration(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<ApplicationContext>(options =>
            options.UseNpgsql(connectionString,
                o =>
                {
                    o.MigrationsAssembly("Hotel.Orbital.Api");
                }));
    }

    /// <summary>
    /// Добавление пользовательских сервисов
    /// </summary>
    /// <param name="services">Коллекция сервисов</param>
    public static void AddServicesConfiguration(this IServiceCollection services)
    {
        services.AddScoped<IRoomsService, RoomsService>();
        services.AddScoped<IImagesService, ImagesService>();
        services.AddScoped<IUsersService, UsersService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<INewsService, NewsService>();
        services.AddScoped<ISpecialOfferService, SpecialOfferService>();
        services.AddScoped<IContactsService, ContactsService>();
        services.AddScoped<INewslettersService, NewslettersService>();
        services.AddScoped<IReviewsService, ReviewsService>();
        services.AddScoped<IHotelImagesService, HotelImageService>();
        services.AddScoped<IChangeLogService, ChangeLogService>();
        services.AddScoped<IEmailService, EmailService>();
        services.AddScoped<IIntegrationService, IntegrationService>();
        services.AddScoped<IAccessService, AccessService>();
        services.AddScoped<ILeisureService, LeisureService>();

        services.AddAutoMapper(typeof(UserProfile));
        services.AddAutoMapper(typeof(RoomProfile));
        services.AddAutoMapper(typeof(NewsProfile));
        services.AddAutoMapper(typeof(SpecialOfferProfile));
        services.AddAutoMapper(typeof(ContactsProfile));
        services.AddAutoMapper(typeof(NewsletterProfile));
        services.AddAutoMapper(typeof(ReviewProfile));
        services.AddAutoMapper(typeof(ChangeLogProfile));
        services.AddAutoMapper(typeof(CollectionResultProfile));
        services.AddAutoMapper(typeof(ModelWithNestedProfile));
        services.AddAutoMapper(typeof(ImageProfile));
        services.AddAutoMapper(typeof(LeisureProfile));

        services.AddScoped<IValidator<UserUpdateParameters>, UsersValidator>();
        services.AddScoped<IValidator<NewsCreateParameters>, NewsValidator>();
        services.AddScoped<IValidator<SpecialOfferCreateParameters>, SpecialOffersValidator>();
        services.AddScoped<IValidator<NewsletterCreateParameters>, NewslettersValidator>();
        services.AddScoped<IValidator<ContactsUpdateParameters>, ContactsValidator>();
        services.AddScoped<IValidator<ReviewCreateParameters>, ReviewsValidator>();
        services.AddScoped<IValidator<LeisureCreateParameters>, LeisureValidator>();

        services.AddCors();

        services.AddHttpContextAccessor();
    }

    /// <summary>
    /// Добавление конфигурации авторизации
    /// </summary>
    /// <param name="services">Коллекция сервисов</param>
    /// <param name="options">Настройки авторизации</param>
    public static void AddAuthConfiguration(this IServiceCollection services, AuthOptions options)
    {
        services.AddSingleton(options);
        
        var key = Encoding.ASCII.GetBytes(options.JwtKey);
        
        services.AddAuthentication(config =>
            {
                config.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(config =>
            {
                config.RequireHttpsMetadata = false;
                config.SaveToken = true;
                config.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = true,
                    ValidIssuer = "Server",
                    ValidateAudience = true,
                    ValidAudience = "Client",
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };
            });
        services.AddAuthorization();
    }

    /// <summary>
    /// Добавление конфигурации сваггера
    /// </summary>
    /// <param name="services">Коллекция сервисов</param>
    public static void AddSwaggerConfiguration(this IServiceCollection services)
    {
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(c =>
        {
            c.EnableAnnotations();
            c.SwaggerDoc("v1", new OpenApiInfo
            {
                Title = "Hotel Orbital Api"
            });
            var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            c.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
            c.DescribeAllParametersInCamelCase();
            c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "Please enter a valid token",
                Name = "Authorization",
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT",
                Scheme = "Bearer"
            });
            c.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type=ReferenceType.SecurityScheme,
                            Id="Bearer"
                        }
                    },
                    new string[]{}
                }
            });
        });
    }

    /// <summary>
    /// Добавление конфигурации изображений
    /// </summary>
    /// <param name="services">Коллекция сервисов</param>
    /// <param name="imageUrlBase">Url сервиса изображений</param>
    public static void AddImageServiceConfiguration(this IServiceCollection services, string imageUrlBase)
    {
        ImageOptions.ImageUrlBase = imageUrlBase;
    }

    /// <summary>
    /// Добавление конфигурации для Quartz
    /// </summary>
    /// <param name="services">Коллекция сервисов</param>
    public static void AddQuartzConfiguration(this IServiceCollection services, string synchronizeCronSchedule, string imageAutoDeleteCronSchedule)
    {
        services.AddQuartz(q =>
        {
            q.UseMicrosoftDependencyInjectionJobFactory();
            
            var synchronizeJobKey = new JobKey("SynchronizeJob");
            q.AddJob<SynchronizeJob>(opts => opts.WithIdentity(synchronizeJobKey));
            
            var imageAutoDeleteJobKey = new JobKey("ImageAutoDeleteJob");
            q.AddJob<ImageAutoDeleteJob>(opts => opts.WithIdentity(imageAutoDeleteJobKey));

            q.AddTrigger(opts => opts
                .ForJob(synchronizeJobKey)
                .WithIdentity("SynchronizeJob-trigger")
                .WithCronSchedule(synchronizeCronSchedule));
            
            q.AddTrigger(opts => opts
                .ForJob(imageAutoDeleteJobKey)
                .WithIdentity("ImageAutoDeleteJob-trigger")
                .WithCronSchedule(imageAutoDeleteCronSchedule));
        });

        services.AddQuartzHostedService(q => q.WaitForJobsToComplete = true);
    }
}