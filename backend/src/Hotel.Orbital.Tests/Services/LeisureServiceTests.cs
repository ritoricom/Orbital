using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using Core.Interfaces;
using Core.Services;
using Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Moq;
using Moq.EntityFrameworkCore;
using Xunit;

namespace Tests.Services;

/// <summary>
/// Тесты для сервиса досуга
/// </summary>
public class LeisureServiceTests
{
    /// <summary/>
    private readonly List<Leisure> _leisures;

    /// <summary/>
    public LeisureServiceTests()
    {
        _leisures = new List<Leisure>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Title = "uhaqwdeu",
                Description = "jeiadeiais",
                Days = JsonSerializer.SerializeToDocument(new List<LeisureDay>()),
                CreatedAt = DateTimeOffset.Now.AddDays(-1)
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "dwegerws",
                Description = "rewgfvwqwsef",
                Days = JsonSerializer.SerializeToDocument(new List<LeisureDay>
                {
                    new ()
                    {
                        Title = "jaswewoi",
                        Description = "ijaswdejwjew"
                    }
                }),
                CreatedAt = DateTimeOffset.Now.AddDays(-2)
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "serfwg<a",
                Description = "qwdqwqwadwq",
                Days = JsonSerializer.SerializeToDocument(new List<LeisureDay>()),
                CreatedAt = DateTimeOffset.Now.AddDays(-3)
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "jythwsef",
                Description = "wewh6tjre",
                Days = JsonSerializer.SerializeToDocument(new List<LeisureDay>
                {
                    new ()
                    {
                        Title = "qrtf64t5tres",
                        Description = "rfegedsrgf"
                    }
                }),
                CreatedAt = DateTimeOffset.Now.AddDays(-4)
            },
            new()
            {
                Id = Guid.NewGuid(),
                Title = "rtdethjrwaw",
                Description = "asregarh5hew",
                Days = JsonSerializer.SerializeToDocument(new List<LeisureDay>()),
                CreatedAt = DateTimeOffset.Now.AddDays(-5)
            },
        };
    }

    /// <summary>
    /// Проверка получения вложенных мероприятий досуга
    /// </summary>
    /// <param name="nestedSize">Количество вложенных элементов</param>
    [Theory]
    [InlineData(3)]
    [InlineData(2)]
    [InlineData(1)]
    [InlineData(0)]
    [InlineData(5)]
    [InlineData(8)]
    [InlineData(10)]
    [InlineData(-1)]
    [InlineData(-5)]
    [InlineData(-10)]
    [InlineData(int.MaxValue)]
    [InlineData(int.MinValue)]
    public async void GetNested_DifferentValues_CorrectResult(int nestedSize)
    {
        var leisureService = GetTestService();
        
        foreach (var leisure in _leisures)
        {
            var result = await leisureService.GetWithNested(leisure.Id, nestedSize);
            
            Assert.Equal(leisure, result.Self);
            var testData = _leisures
                .Where(news => news.Id != leisure.Id)
                .OrderByDescending(news => news.CreatedAt)
                .Take(nestedSize);
            
            Assert.Equal(testData, result.Nested);
        }
    }
    
    /// <summary>
    /// Получение сервиса для тестирования
    /// </summary>
    /// <returns>Сервис с подмененными зависимостями</returns>
    private LeisureService GetTestService()
    {
        var options = new DbContextOptions<ApplicationContext>();
        var applicationContextMock = new Mock<ApplicationContext>(options);
        var accessServiceMock = new Mock<IAccessService>();
        var imagesServiceMock = new Mock<IImagesService>();
        var changeLogServiceMock = new Mock<IChangeLogService>();
        applicationContextMock.Setup(x => x.Leisures).ReturnsDbSet(_leisures);

        var leisureService = new LeisureService(applicationContextMock.Object, accessServiceMock.Object, imagesServiceMock.Object, changeLogServiceMock.Object);

        return leisureService;
    }
}