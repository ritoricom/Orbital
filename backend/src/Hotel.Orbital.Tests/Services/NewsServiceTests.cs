using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using Core.Interfaces;
using Core.SearchContexts;
using Core.Services;
using Entities;
using Entities.Enums;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Moq;
using Moq.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Xunit;

namespace Tests.Services;

/// <summary>
/// Тесты для сервиса новостей
/// </summary>
public class NewsServiceTests
{
    /// <summary/>
    private readonly List<News> _news;

    /// <summary/>
    public NewsServiceTests()
    {
        _news = new List<News>
        {
            new News
            {
                Id = Guid.NewGuid(),
                Titles = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>
                {
                    { Language.Ru , "Тест1"},
                    { Language.En , "Test1"}
                }),
                
                Descriptions = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>
                {
                    { Language.Ru , "Тест1"},
                    { Language.En , "Test1"}
                }),
                PublishedAt = DateTimeOffset.Now.AddDays(-1)
            },
            new News
            {
                Id = Guid.NewGuid(),
                Titles = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>
                {
                    { Language.Ru , "Тест2"},
                    { Language.En , "Test2"}
                }),
                Descriptions = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>
                {
                    { Language.Ru , "Тест2"},
                    { Language.En , "Test2"}
                }),
                PublishedAt = DateTimeOffset.Now.AddDays(-2)
            },
            new News
            {
                Id = Guid.NewGuid(),
                Titles = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>
                {
                    { Language.Ru , "Тест3"},
                    { Language.En , "Test3"}
                }),
                Descriptions = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>
                {
                    { Language.Ru , "Тест3"},
                    { Language.En , "Test3"}
                }),
                PublishedAt = DateTimeOffset.Now.AddDays(-3)
            },
            new News
            {
                Id = Guid.NewGuid(),
                Titles = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>
                {
                    { Language.Ru , "Тест4"},
                    { Language.En , "Test4"}
                }),
                Descriptions = JsonSerializer.SerializeToDocument(new Dictionary<Language, string>
                {
                    { Language.Ru , "Тест4"},
                    { Language.En , "Test4"}
                }),
                PublishedAt = DateTimeOffset.Now.AddDays(1)
            }
        };
    }
    
    /// <summary>
    /// Проверка получения вложенных новостей
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
        var newsService = GetTestService();

        var nestedSearchContext = new NewsNestedSearchContext
        {
            NestedSize = nestedSize
        };
        
        foreach (var singleNews in GetActualNews())
        {
            var result = await newsService.GetWithNested(singleNews.Id, nestedSearchContext);
            
            Assert.Equal(singleNews, result.Self);
            var testData = GetActualNews()
                .Where(news => news.Id != singleNews.Id)
                .OrderByDescending(news => news.PublishedAt)
                .Take(nestedSize);
            
            Assert.Equal(testData, result.Nested);
        }
    }

    /// <summary>
    /// Полуение актуальных новостей
    /// </summary>
    /// <returns></returns>
    private List<News> GetActualNews()
    {
        return _news.Where(news => news.PublishedAt <= DateTime.Now).ToList();
    }

    /// <summary>
    /// Получение сервиса для тестирования
    /// </summary>
    /// <returns>Сервис с подмененными зависимостями</returns>
    private NewsService GetTestService()
    {
        var options = new DbContextOptions<ApplicationContext>();
        var applicationContextMock = new Mock<ApplicationContext>(options);
        var imagesServiceMock = new Mock<IImagesService>();
        var accessServiceMock = new Mock<IAccessService>();
        var changeLogServiceMock = new Mock<IChangeLogService>();
        applicationContextMock.Setup(x => x.News).ReturnsDbSet(_news);

        var newsService = new NewsService(applicationContextMock.Object, imagesServiceMock.Object, accessServiceMock.Object, changeLogServiceMock.Object);

        return newsService;
    }
}