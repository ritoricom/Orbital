using System.Collections.Generic;
using Core.Exceptions;
using Core.Interfaces;
using Core.Models;
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
/// Тесты для сервиса рассылок
/// </summary>
public class NewslettersServiceTests
{
    /// <summary/>
    private readonly List<Newsletter> _newsletters;

    /// <summary/>
    private readonly List<Hotel> _hotels;

    /// <summary/>
    public NewslettersServiceTests()
    {
        _hotels = new List<Hotel>
        {
            new Hotel
            {
                City = City.Nvz
            },
            new Hotel
            {
                City = City.Obn
            }
        };
        
        _newsletters = new List<Newsletter>
        {
            new()
            {
                Email = "test1@mail.com",
                Hotel = _hotels[0]
            },
            new()
            {
                Email = "test1@mail.com",
                Hotel = _hotels[0]
            },
            new()
            {
                Email = "test1@mail.com",
                Hotel = _hotels[0]
            },
            new()
            {
                Email = "test1@mail.com",
                Hotel = _hotels[0]
            }
        };
    }

    /// <summary>
    /// Проверка добавления существующей почты
    /// </summary>
    /// <param name="index">Индекс элемента из тестовых данных</param>
    [Theory]
    [InlineData(0)]
    [InlineData(1)]
    [InlineData(2)]
    [InlineData(3)]
    public async void EmailExists_AlreadyUsedEmail_ThrowsException(int index)
    {
        var newslettersService = GetTestService();

        var parameters = new NewsletterCreateParameters
        {
            City = City.Nvz,
            Email = _newsletters[index].Email
        };
        
        await Assert.ThrowsAsync<NewslettersEmailAlreadyExistsException>(() => newslettersService.Create(parameters));
    }

    /// <summary>
    /// Проверка успешного добавления
    /// </summary>
    /// <param name="index">Индекс элемента из тестовых данных</param>
    [Theory]
    [InlineData(0)]
    [InlineData(1)]
    [InlineData(2)]
    [InlineData(3)]
    public async void SuccessCreateTests(int index)
    {
        var newslettersService = GetTestService();

        var parameters = new NewsletterCreateParameters
        {
            City = City.Obn,
            Email = _newsletters[index].Email
        };
        
        await newslettersService.Create(parameters);
    }

    /// <summary>
    /// Получение сервиса для тестирования
    /// </summary>
    /// <returns>Сервис с подмененными зависимостями</returns>
    private NewslettersService GetTestService()
    {
        var options = new DbContextOptions<ApplicationContext>();
        var applicationContextMock = new Mock<ApplicationContext>(options);
        var accessServiceMock = new Mock<IAccessService>();
        var changeLogServiceMock = new Mock<IChangeLogService>();
        applicationContextMock.Setup(x => x.Newsletters).ReturnsDbSet(_newsletters);
        applicationContextMock.Setup(x => x.Hotels).ReturnsDbSet(_hotels);

        var newslettersService = new NewslettersService(applicationContextMock.Object, accessServiceMock.Object, changeLogServiceMock.Object);

        return newslettersService;
    }

}