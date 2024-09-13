using System;
using System.Collections.Generic;
using System.Security.Claims;
using Core.Services;
using Entities;
using Entities.Enums;
using Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Moq;
using Moq.EntityFrameworkCore;
using Xunit;

namespace Tests.Services;

/// <summary>
/// Тесты для сервиса проверки доступов
/// </summary>
public class AccessServiceTests
{
    /// <summary/>
    private readonly User _user;
    
    /// <summary/>
    public AccessServiceTests()
    {
        _user = new User
        {
            Id = Guid.NewGuid(),
            FullName = "string1",
            Email = "user@example.com",
            Role = Role.Admin,
            Password = "string"
        };
    }

    /// <summary>
    /// Проверка сопоставления доступов на правильных даннных
    /// </summary>
    /// <param name="role">Роль пользователя</param>
    /// <param name="userCity">Город пользователя</param>
    /// <param name="city">Город для проверки доступа</param>
    [Theory]
    [InlineData(Role.Admin, null, null)]
    [InlineData(Role.Admin, null, City.Nvz)]
    [InlineData(Role.Admin, null, City.Obn)]
    [InlineData(Role.Admin, null, City.Spb)]
    [InlineData(Role.Manager, City.Nvz, City.Nvz)]
    [InlineData(Role.Manager, City.Obn, City.Obn)]
    [InlineData(Role.Manager, City.Spb, City.Spb)]
    public async void AccessCheck_RightCredentials_TrueResult(Role role, City? userCity, City? city)
    {
        var claims = new List<Claim>
        {
            new Claim("id", _user.Id.ToString()),
            new Claim("role", role.ToString()),
            new Claim("city", userCity.ToString() ?? string.Empty)
        };

        _user.Role = role;
        _user.City = userCity;

        var accessService = GetTestService(claims);
        
        var hasAccess = await accessService.HasAccess(city);
        
        Assert.True(hasAccess);
    }
    
    /// <summary>
    /// Проверка сопоставления доступов на неправильных даннных
    /// </summary>
    /// <param name="role">Роль пользователя</param>
    /// <param name="userCity">Город пользователя</param>
    /// <param name="city">Город для проверки доступа</param>
    [Theory]
    [InlineData(Role.Manager, City.Nvz, null)]
    [InlineData(Role.Manager, City.Obn, null)]
    [InlineData(Role.Manager, City.Spb, null)]
    [InlineData(Role.Manager, City.Nvz, City.Obn)]
    [InlineData(Role.Manager, City.Obn, City.Spb)]
    [InlineData(Role.Manager, City.Spb, City.Nvz)]
    [InlineData(Role.Manager, City.Nvz, City.Spb)]
    [InlineData(Role.Manager, City.Obn, City.Nvz)]
    [InlineData(Role.Manager, City.Spb, City.Obn)]
    public async void AccessCheck_WrongCredentials_FalseResult(Role role, City? userCity, City? city)
    {
        var claims = new List<Claim>
        {
            new Claim("id", _user.Id.ToString()),
            new Claim("role", role.ToString()),
            new Claim("city", userCity.ToString() ?? string.Empty)
        };

        _user.Role = role;
        _user.City = userCity;
        
        var accessService = GetTestService(claims);

        var hasAccess = await accessService.HasAccess(city);
        
        Assert.False(hasAccess);
    }
    
    /// <summary>
    /// Получение сервиса для тестирования
    /// </summary>
    /// <param name="claims">Данные пользователя для предустановки</param>
    /// <returns>Сервис с подмененными зависимостями</returns>
    private AccessService GetTestService(List<Claim> claims)
    {
        var options = new DbContextOptions<ApplicationContext>();
        var applicationContextMock = new Mock<ApplicationContext>(options);
        var httpContextAccessorMock = new Mock<IHttpContextAccessor>();
        httpContextAccessorMock.Setup(x => (x.HttpContext!.User.Claims)).Returns(claims);
        applicationContextMock.Setup(x => x.Users).ReturnsDbSet(new List<User>{_user});

        var accessService = new AccessService(applicationContextMock.Object, httpContextAccessorMock.Object);

        return accessService;
    }
}