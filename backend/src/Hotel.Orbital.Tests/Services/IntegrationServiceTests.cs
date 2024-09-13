using System;
using System.Collections.Generic;
using System.Text.Json;
using BnovoIntegration.Clients;
using BnovoIntegration.Models;
using Core.Interfaces;
using Core.Services;
using Entities;
using Entities.Enums;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Moq;
using Moq.EntityFrameworkCore;
using Xunit;

namespace Tests.Services;

/// <summary>
/// Тесты для сервиса интеграции
/// </summary>
public class IntegrationServiceTests
{
    /// <summary/>
    private List<Room> _rooms;

    /// <summary/>
    private List<Room> _tempRooms;

    /// <summary/>
    private readonly List<RoomType> _roomTypes;

    /// <summary/>
    private readonly List<Hotel> _hotels = new List<Hotel>();

    /// <summary/>
    public IntegrationServiceTests()
    {
        var hotel = new Hotel
        {
            City = City.Nvz
        };

        _hotels.Add(hotel);
        
        _rooms = new List<Room>
        {
            new Room
            {
                Id = Guid.NewGuid(),
                BnovoId = 1,
                Titles = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>
                {
                    { Language.Ru, "Тест1" },
                    { Language.En, "Test1" }
                }),
                Descriptions = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>
                {
                    { Language.Ru, "Тест1" },
                    { Language.En, "Test1" }
                }),
                Peculiarities = JsonSerializer.SerializeToDocument(new Dictionary<Language, IEnumerable<string>>
                {
                    { Language.Ru, new[] { "" } },
                    { Language.En, new[] { "" } }
                }),
                RoomGallery = new RoomGallery(),
                Price = 1000,
                Hotel = hotel
            },
            new Room
            {
                Id = Guid.NewGuid(),
                BnovoId = 2,
                Titles = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>
                {
                    { Language.Ru, "Тест2" },
                    { Language.En, "Test2" }
                }),
                Descriptions = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>
                {
                    { Language.Ru, "Тест2" },
                    { Language.En, "Test2" }
                }),
                Peculiarities = JsonSerializer.SerializeToDocument(new Dictionary<Language, IEnumerable<string>>
                {
                    { Language.Ru, new[] { "" } },
                    { Language.En, new[] { "" } }
                }),
                RoomGallery = new RoomGallery(),
                Price = 2000,
                Hotel = hotel
            }
        };

        _roomTypes = new List<RoomType>
        {
            new()
            {
                Id = 1,
                NameRu = "eoqwu3eqauwe",
                NameEn = "kewjarhfquwi",
                DescriptionRu = "ihsqafeahu",
                DescriptionEn = "kewswhfuhw",
                CreatedAt = DateTime.Now.AddDays(-1),
                UpdatedAt = DateTime.Now.AddDays(-1),
                Price = 2000
            },
            new()
            {
                Id = 2,
                NameRu = "dejghswroish",
                NameEn = "ewjdqaouewsd",
                DescriptionRu = "eryhedstgs",
                DescriptionEn = "wrestqawe4",
                CreatedAt = DateTime.Now.AddDays(-1),
                UpdatedAt = DateTime.Now.AddDays(-1),
                Price = 1000
            }
        };
    }

    /// <summary>
    /// Проверка добавления новых номеров
    /// </summary>
    [Fact]
    public async void Synchronize_CreateRooms_CorrectResult()
    {
        var integrationService = GetServiceForCreate();

        await integrationService.Synchronize();

        for (var i = 0; i < _tempRooms.Count; i++)
        {
            Assert.Equal(_roomTypes[i].Id, _tempRooms[i].BnovoId);
        }
    }
    
    /// <summary>
    /// Проверка редактирования номеров
    /// </summary>
    [Fact]
    public async void Synchronize_UpdateRooms_CorrectResult()
    {
        var integrationService = GetServiceForUpdate();

        await integrationService.Synchronize();

        for (var i = 0; i < _rooms.Count; i++)
        {
            Assert.Equal(_roomTypes[i].Id, _rooms[i].BnovoId);
            Assert.Equal(_roomTypes[i].NameRu, _rooms[i].Titles.RootElement.GetProperty("Ru").GetString());
            Assert.Equal(_roomTypes[i].NameEn, _rooms[i].Titles.RootElement.GetProperty("En").GetString());
            Assert.Equal(_roomTypes[i].DescriptionRu, _rooms[i].Descriptions.RootElement.GetProperty("Ru").GetString());
            Assert.Equal(_roomTypes[i].DescriptionEn, _rooms[i].Descriptions.RootElement.GetProperty("En").GetString());
        }
    }

    /// <summary>
    /// Получение сервиса для тестирования добавления
    /// </summary>
    /// <returns>Сервис с подмененными зависимостями</returns>
    private IntegrationService GetServiceForCreate()
    {
        var bnovoClientMock = new Mock<IBnovoClient>();
        bnovoClientMock.Setup(x => x.GetActualRooms(1, default)).ReturnsAsync(_roomTypes);
        
        var options = new DbContextOptions<ApplicationContext>();
        var applicationContextMock = new Mock<ApplicationContext>(options);
        _tempRooms = new List<Room>();
        applicationContextMock.Setup(x => x.Rooms).ReturnsDbSet(_tempRooms);
        applicationContextMock.Setup(x => x.Hotels).ReturnsDbSet(_hotels);

        var service = GetTestService(bnovoClientMock, applicationContextMock);

        return service;
    }

    /// <summary>
    /// Получение сервиса для тестирования редактирования
    /// </summary>
    /// <returns>Сервис с подмененными зависимостями</returns>
    private IntegrationService GetServiceForUpdate()
    {
        var bnovoClientMock = new Mock<IBnovoClient>();
        bnovoClientMock.Setup(x => x.GetActualRooms(1, default)).ReturnsAsync(_roomTypes);
        
        var options = new DbContextOptions<ApplicationContext>();
        var applicationContextMock = new Mock<ApplicationContext>(options);
        applicationContextMock.Setup(x => x.Rooms).ReturnsDbSet(_rooms);
        applicationContextMock.Setup(x => x.Hotels).ReturnsDbSet(_hotels);
        applicationContextMock.Setup(x => x.Images).ReturnsDbSet(new List<Image>());

        var service = GetTestService(bnovoClientMock, applicationContextMock);

        return service;
    }

    /// <summary>
    /// Получение сервиса для тестирования интеграции
    /// </summary>
    /// <param name="bnovoClientMock">Mock клиента для интеграции bnovo <see cref="IBnovoClient"/></param>
    /// <param name="applicationContextMock">Mock контекста подключения к БД <see cref="ApplicationContext"/></param>
    /// <returns>Сервис с подмененными зависимостями</returns>
    private IntegrationService GetTestService(Mock<IBnovoClient> bnovoClientMock, Mock<ApplicationContext> applicationContextMock)
    {
        
        var dictionary = new Dictionary<City, int>
        {
            { City.Nvz, 1 }
        };
        var imagesServiceMock = new Mock<IImagesService>();
        var changeLogServiceMock = new Mock<IChangeLogService>();
        
        var integrationService = new IntegrationService(applicationContextMock.Object, bnovoClientMock.Object, dictionary, imagesServiceMock.Object, changeLogServiceMock.Object);

        return integrationService;
    }
}