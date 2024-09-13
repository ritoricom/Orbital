using System;
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
/// Тесты для сервиса пользователей
/// </summary>
public class UsersServiceTests
{
    /// <summary/>
    private readonly List<User> _users;

    /// <summary/>
    public UsersServiceTests()
    {
        _users = new List<User>
        {
            new User
            {
                Id = Guid.NewGuid(),
                FullName = "string1",
                Email = "user@example.com",
                Role = Role.Admin,
                Password = "string"
            },
            new User
            {
                Id = Guid.NewGuid(),
                FullName = "string2",
                Email = "user1@example.com",
                Role = Role.Manager,
                City = City.Nvz,
                Password = "string"
            },
            new User
            {
                Id = Guid.NewGuid(),
                FullName = "string3",
                Email = "user2@example.com",
                Role = Role.Manager,
                City = City.Obn,
                Password = "string",
                RemovedAt = DateTimeOffset.Now
            },
        };
    }

    /// <summary>
    /// Проверка добавления пользователя с существующей почтой
    /// </summary>
    /// <param name="index">Индекс пользователя из тестовых данных</param>
    [Theory]
    [InlineData(0)]
    [InlineData(1)]
    public async void EmailExists_AlreadyUsedEmail_ThrowsException(int index)
    {
        var usersService = GetTestService();

        var parameteres = new UserCreateParameters
        {
            Email = _users[index].Email,
            Password = "jehsw",
            FullName = "spieijw",
            Role = Role.Manager,
            City = City.Nvz
        };
        
        await Assert.ThrowsAsync<EmailAlreadyExistsException>(() => usersService.Create(parameteres));
    }

    /// <summary>
    /// Проверка создания пользователя с почтой удаленного пользователя
    /// </summary>
    [Fact]
    public async void Create_WithRemovedUserEmail_CorrectResult()
    {
        var usersService = GetTestService();

        var parameteres = new UserCreateParameters
        {
            Email = _users[2].Email,
            Password = "jehsw",
            FullName = "spieijw",
            Role = Role.Manager,
            City = City.Nvz
        };
        
        await usersService.Create(parameteres);
    }

    /// <summary>
    /// Получение сервиса для тестирования
    /// </summary>
    /// <returns>Сервис с подмененными зависимостями</returns>
    private UsersService GetTestService()
    {
        var options = new DbContextOptions<ApplicationContext>();
        var applicationContextMock = new Mock<ApplicationContext>(options);
        var accessServiceMock = new Mock<IAccessService>();
        var changeLogServiceMock = new Mock<IChangeLogService>();
        applicationContextMock.Setup(x => x.Users).ReturnsDbSet(_users);

        var usersService = new UsersService(applicationContextMock.Object, changeLogServiceMock.Object, accessServiceMock.Object);

        return usersService;
    }
}