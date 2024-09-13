using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
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
/// Тесты для сервиса спецпредложений
/// </summary>
public class SpecialOffersServiceTests
{
    /// <summary/>
    private readonly List<SpecialOffer> _specialOffers;

    /// <summary/>
    public SpecialOffersServiceTests()
    {
        _specialOffers = new List<SpecialOffer>
        {
            new SpecialOffer
            {
                Id = Guid.NewGuid(),
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
                ShortDescriptions = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>
                {
                    { Language.Ru, "Тест1" },
                    { Language.En, "Test1" }
                }),
                CreatedAt = DateTimeOffset.Now.AddDays(-1)
            },
            new SpecialOffer
            {
                Id = Guid.NewGuid(),
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
                ShortDescriptions = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>
                {
                    { Language.Ru, "Тест1" },
                    { Language.En, "Test1" }
                }),
                CreatedAt = DateTimeOffset.Now.AddDays(-2)
            },
            new SpecialOffer
            {
                Id = Guid.NewGuid(),
                Titles = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>
                {
                    { Language.Ru, "Тест3" },
                    { Language.En, "Test3" }
                }),
                Descriptions = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>
                {
                    { Language.Ru, "Тест3" },
                    { Language.En, "Test3" }
                }),
                ShortDescriptions = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>
                {
                    { Language.Ru, "Тест1" },
                    { Language.En, "Test1" }
                }),
                CreatedAt = DateTimeOffset.Now.AddDays(-3)
            },
            new SpecialOffer
            {
                Id = Guid.NewGuid(),
                Titles = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>
                {
                    { Language.Ru, "Тест4" },
                    { Language.En, "Test4" }
                }),
                Descriptions = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>
                {
                    { Language.Ru, "Тест4" },
                    { Language.En, "Test4" }
                }),
                ShortDescriptions = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>
                {
                    { Language.Ru, "Тест1" },
                    { Language.En, "Test1" }
                }),
                CreatedAt = DateTimeOffset.Now.AddDays(-4)
            }
        };
    }

    /// <summary>
    /// Получение вложенных спецпредложений
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
        var specialOfferService = GetTestService();
        
        foreach (var singleSpecialOffer in _specialOffers)
        {
            var result = await specialOfferService.GetWithNested(singleSpecialOffer.Id, nestedSize);
            
            Assert.Equal(singleSpecialOffer, result.Self);
            var testData = _specialOffers
                .Where(specialOffer => specialOffer.Id != singleSpecialOffer.Id).Take(nestedSize)
                .OrderByDescending(specialOffer => specialOffer.CreatedAt);
            Assert.Equal(testData, result.Nested);
        }
    }
    
    /// <summary>
    /// Получение сервиса для тестирования
    /// </summary>
    /// <returns>Сервис с подмененными зависимостями</returns>
    private SpecialOfferService GetTestService()
    {
        var options = new DbContextOptions<ApplicationContext>();
        var applicationContextMock = new Mock<ApplicationContext>(options);
        var imagesServiceMock = new Mock<IImagesService>();
        var changeLogServiceMock = new Mock<IChangeLogService>();
        applicationContextMock.Setup(x => x.SpecialOffers).ReturnsDbSet(_specialOffers);

        var specialOfferService = new SpecialOfferService(applicationContextMock.Object, imagesServiceMock.Object, changeLogServiceMock.Object);

        return specialOfferService;
    }
}