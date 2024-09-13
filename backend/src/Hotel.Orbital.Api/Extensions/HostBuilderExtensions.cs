using System.Text.Json;
using Core.Extensions;
using Core.Models;
using Entities;
using Entities.Enums;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using WebDavImageService.Clients;
using BC = BCrypt.Net.BCrypt;

namespace Api.Extensions;

/// <summary>
/// Методы расширения для <see cref="IHost"/>
/// </summary>
public static class HostBuilderExtensions
{
    /// <summary>
    /// Миграции для БД
    /// </summary>
    public static IHost MigrateDatabase(this IHost host)
    {
        using var databaseContext = host.Services.CreateScope().ServiceProvider.GetRequiredService<ApplicationContext>();
        
        MigrateImagesToWebDav(host, databaseContext);
        
        databaseContext.Database.Migrate();

        return host;
    }

    /// <summary>
    /// Добавление начальных данных в БД
    /// </summary>
    public static IHost SeedData(this IHost host)
    {
        SeedHotels(host);
        
        var admin = host.Services.GetRequiredService<UserSeedParameters>();
        
        SeedUsers(host, admin);
        SeedContacts(host);
        
        return host;
    }

    /// <summary/>
    private static async void SeedHotels(IHost host)
    {
        using (var databaseContext = host.Services.CreateScope().ServiceProvider.GetRequiredService<ApplicationContext>())
        {
            if (!databaseContext.Hotels.Any())
            {
                databaseContext.Hotels.AddRange(new List<Hotel>
                {
                    new() { 
                        Id = Guid.Parse("2494bd01-ae55-4846-83cd-6ecaa941ce70"), 
                        City = City.Obn, 
                        HotelGallery = new()
                        {
                            Id = Guid.Parse("4738c316-5b86-4624-86ef-5ddc48908c17")
                        }
                    },
                    new()
                    {
                        Id = Guid.Parse("4f4dbdf9-f8da-48f9-bccb-50c123c5c009"), 
                        City = City.Spb,
                        HotelGallery = new()
                        {
                            Id = Guid.Parse("b9dcb14f-1e1f-42f0-93e1-d8ab4f271df9")
                        }
                    },
                    new()
                    {
                        Id = Guid.Parse("19e937cf-e966-4257-ad5c-58a8e100cf5e"), 
                        City = City.Nvz,
                        HotelGallery = new()
                        {
                            Id = Guid.Parse("3b7a87c3-af65-438d-a16a-a8d5851ed161")
                        }
                    }
                });
                
                await databaseContext.SaveChangesAsync();
            }
            else
            {
                var nvzHotel = await databaseContext.Hotels
                    .Include(hotel => hotel.HotelGallery)
                    .SingleOrNotFoundAsync(hotel =>
                    hotel.Id == Guid.Parse("19e937cf-e966-4257-ad5c-58a8e100cf5e"));
                
                nvzHotel.HotelGallery ??= new HotelGallery();
                
                var obnHotel = await databaseContext.Hotels
                    .Include(hotel => hotel.HotelGallery)
                    .SingleOrNotFoundAsync(hotel =>
                    hotel.Id == Guid.Parse("2494bd01-ae55-4846-83cd-6ecaa941ce70"));
                
                obnHotel.HotelGallery ??= new HotelGallery();
                
                var spbHotel = await databaseContext.Hotels.Include(hotel => hotel.HotelGallery)
                    .Include(hotel => hotel.HotelGallery)
                    .SingleOrNotFoundAsync(hotel =>
                    hotel.Id == Guid.Parse("4f4dbdf9-f8da-48f9-bccb-50c123c5c009"));

                spbHotel.HotelGallery ??= new HotelGallery();
                
                await databaseContext.SaveChangesAsync();
            }
        }
    }

    /// <summary/>
    private static async void SeedContacts(IHost host)
    {
        using var databaseContext =
            host.Services.CreateScope().ServiceProvider.GetRequiredService<ApplicationContext>();
        
        if (!databaseContext.Contacts.Any())
        {
            databaseContext.Contacts.AddRange(new List<Contacts>
            {
                new() {Id = Guid.Parse("bbe4b0b0-e145-461e-abd3-72ae831fc81b"), 
                    Hotel = await databaseContext.Hotels.SingleOrNotFoundAsync(hotel => hotel.City == City.Nvz),
                    Addresses = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>()
                    {
                        { Language.Ru , "ул. Курчатова, дом 2Б"},
                        { Language.En , "Kurchatova Street, 2B"}
                    }),
                    Email = "infonvz@orbital-hotel.ru",
                    Phone = "1234567890",
                    Location = JsonSerializer.SerializeToDocument(new Point{Longitude = 39.216612, Latitude = 51.314647}),
                    VkLink = "https://vk.com/orbitalhotel"
                },
                new() {Id = Guid.Parse("61a7a9db-3261-4b5a-b577-dfd3af8ce54d"), 
                    Hotel = await databaseContext.Hotels.SingleOrNotFoundAsync(hotel => hotel.City == City.Obn),
                    Addresses = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>()
                    {
                        { Language.Ru , "ул. Курчатова, дом 23"},
                        { Language.En , "Kurchatova Street, 23"}
                    }),
                    Email = "infoobn@orbital-hotel.ru",
                    Phone = "1234567890",
                    Location = JsonSerializer.SerializeToDocument(new Point{Longitude = 36.618044, Latitude = 55.105526}),
                    VkLink = "https://vk.com/orbitalhotel"
                },
                new() {Id = Guid.Parse("27196225-5200-4f0c-ae7c-347189bcc80f"), 
                    
                    Hotel = await databaseContext.Hotels.SingleOrNotFoundAsync(hotel => hotel.City == City.Spb),
                    Addresses = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>()
                    {
                        { Language.Ru , "ул. Генерала Хрулёва, дом 5"},
                        { Language.En , "General Khruleva Street, 5"}
                    }),
                    Email = "infospb@orbital-hotel.ru",
                    Phone = "1234567890",
                    Location = JsonSerializer.SerializeToDocument(new Point{Longitude = 30.296132, Latitude = 59.996227}),
                    VkLink = "https://vk.com/orbitalhotel"
                },
            });
        }

        await databaseContext.SaveChangesAsync();
    }

    /// <summary/>
    private static void SeedUsers(IHost host, UserSeedParameters parameters)
    {
        using (var databaseContext = host.Services.CreateScope().ServiceProvider.GetRequiredService<ApplicationContext>())
        {
            var user = databaseContext.Users.SingleOrDefault(user =>
                user.Id == Guid.Parse("faafe15d-bf2f-4d5c-875b-f123e1d7e6a8"));
            
            if (user == null)
            {
                if (!databaseContext.Users.Any(u => u.Email == parameters.Email))
                {
                    var admin = new User
                    {
                        Id = Guid.Parse("faafe15d-bf2f-4d5c-875b-f123e1d7e6a8"),
                        FullName = "Администратор",
                        Email = parameters.Email,
                        Password = BC.HashPassword(parameters.Password),
                        Role = Role.Admin,
                        CreatedAt = DateTimeOffset.Now,
                        UpdatedAt = DateTimeOffset.Now,
                        RemovedAt = DateTimeOffset.MinValue
                    };

                    databaseContext.Users.Add(admin);
                }
            }
            else
            {
                user.Email = parameters.Email;
                user.Password = BC.HashPassword(parameters.Password);
                user.Role = Role.Admin;
                user.City = null;
                user.UpdatedAt = DateTimeOffset.Now;
                user.RemovedAt = DateTimeOffset.MinValue;
            }

            databaseContext.SaveChanges();
        }
    
    }
    
    /// <summary/>
    private static void MigrateImagesToWebDav(IHost host, ApplicationContext context)
    {
        var imageBytesExists = context.Database.SqlQueryRaw<bool>(
                "SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Images' AND column_name='ImageBytes')")
            .ToList().Single();

        var imageBytesProp = context.Model.FindEntityType("Entities.Image").FindProperty("ImageBytes");
        
        if (!imageBytesExists || imageBytesProp != null) return;
        
        using var transaction = context.Database.BeginTransaction();

        try
        {
            var ids = context.Database.SqlQueryRaw<Guid>($"SELECT \"Id\" FROM \"Images\"").ToList();
            var images = new Dictionary<Guid, byte[]>();
            
            foreach (var id in ids)
            {
                images.Add(id, context.Database.SqlQueryRaw<byte[]>($"SELECT \"ImageBytes\" FROM \"Images\" WHERE \"Id\"='{id}'").ToList().Single());
            }
            
            using var client = host.Services.CreateScope().ServiceProvider.GetRequiredService<IWebDavClient>();
            
            foreach (var image in images)
            {
                client.SaveAsync(image.Key, new MemoryStream(image.Value)).Wait();
            }

            transaction.Commit();
        }
        catch (Exception)
        {
            transaction.Rollback();
        }
    }
}
