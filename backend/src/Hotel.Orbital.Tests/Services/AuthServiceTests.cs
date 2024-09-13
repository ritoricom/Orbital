using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Core.Exceptions;
using Core.Interfaces;
using Core.Models;
using Core.Options;
using Core.Services;
using Entities;
using Entities.Enums;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Moq;
using Moq.EntityFrameworkCore;
using Xunit;
using BC = BCrypt.Net.BCrypt;

namespace Tests.Services;

/// <summary>
/// Тесты для проверки сервиса аутентификации
/// </summary>
public class AuthServiceTests
{
    /// <summary/>
    private readonly List<User> _users;

    /// <summary/>
    public AuthServiceTests()
    {
        _users = new List<User>
        {
            new()
            {
                Id = Guid.NewGuid(),
                FullName = "admin",
                Email = "admin@example.com",
                Role = Role.Admin,
                Password = BC.HashPassword("test")
            },
            new()
            {
                Id = Guid.NewGuid(),
                FullName = "user",
                Email = "user@example.com",
                Role = Role.Manager,
                City = City.Nvz,
                Password = BC.HashPassword("test")
            }
        };
    }

    /// <summary>
    /// Проверка токена администратора
    /// </summary>
    [Fact]
    public async void Auth_AdminCredentials_RightResult()
    {
        var authService = GetTestService();

        var user = _users.First(u => u.Role == Role.Admin);

        var loginParameters = new UserLoginParameters
        {
            Email = user.Email,
            Password = "test"
        };

        var result = await authService.GetToken(loginParameters);
        
        Assert.True(user.Id.ToString() == result.Claims.First(c => c.Type == "id").Value);
        Assert.True(user.Role.ToString() == result.Claims.First(c => c.Type == "role").Value);
        Assert.True(user.City.ToString() == result.Claims.First(c => c.Type == "city").Value);
    }
    
    /// <summary>
    /// Проверка токена менеджера
    /// </summary>
    [Fact]
    public async void Auth_ManagerCredentials_RightResult()
    {
        var authService = GetTestService();

        var user = _users.First(u => u.Role == Role.Manager);

        var loginParameters = new UserLoginParameters
        {
            Email = user.Email,
            Password = "test"
        };

        var result = await authService.GetToken(loginParameters);
        
        Assert.True(user.Id.ToString() == result.Claims.First(c => c.Type == "id").Value);
        Assert.True(user.Role.ToString() == result.Claims.First(c => c.Type == "role").Value);
        Assert.True(user.City.ToString() == result.Claims.First(c => c.Type == "city").Value);
    }

    /// <summary>
    /// Проверка ввода неверного пароля
    /// </summary>
    [Fact]
    public async void Auth_WrongPassword_ThrowsException()
    {
        var authService = GetTestService();

        var user = _users.First(u => u.Role == Role.Manager);

        var loginParameters = new UserLoginParameters
        {
            Email = user.Email,
            Password = "rednigfhnuswfdeua"
        };

        await Assert.ThrowsAsync<InvalidEmailOrPasswordException>(() => authService.GetToken(loginParameters));
    }
    
    /// <summary>
    /// Проверка ввода неверной почты
    /// </summary>
    [Fact]
    public async void Auth_WrongEmail_ThrowsException()
    {
        var authService = GetTestService();

        var loginParameters = new UserLoginParameters
        {
            Email = "test@test.ru",
            Password = "test"
        };
        
        await Assert.ThrowsAsync<InvalidEmailOrPasswordException>(() => authService.GetToken(loginParameters));
    }
    
    /// <summary>
    /// Получение сервиса для тестирования
    /// </summary>
    /// <returns>Сервис с подмененными зависимостями</returns>
    private AuthService GetTestService()
    {
        var options = new DbContextOptions<ApplicationContext>();
        var applicationContextMock = new Mock<ApplicationContext>(options);
        var authOptions = new AuthOptions
        {
            JwtKey = "test"
        };
        var changeLogServiceMock = new Mock<IChangeLogService>();
        applicationContextMock.Setup(x => x.Users).ReturnsDbSet(_users);

        var authService = new AuthService(applicationContextMock.Object, authOptions, changeLogServiceMock.Object);

        return authService;
    }
}