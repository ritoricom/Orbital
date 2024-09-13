using System;
using Api.Validators;
using AutoFixture.Xunit2;
using Core.Models;
using Entities.Enums;
using FluentValidation;
using Xunit;

namespace Tests.Validators;

/// <summary>
/// Тесты для проверки валидатора <see cref="UsersValidator"/>
/// </summary>
public class UsersValidatorTests
{
    /// <summary/>
    private UserCreateParameters _parameters;

    /// <summary/>
    public UsersValidatorTests()
    {
        _parameters = new UserCreateParameters
        {
            FullName = "string1",
            Email = "user@example.com",
            Role = Role.Admin,
            Password = "string"
        };
    }

    /// <summary>
    /// Проверка валидации роли и города
    /// </summary>
    /// <param name="city">Город</param>
    /// <param name="role">Роль</param>
    [Theory]
    [InlineData(null, Role.Manager)]
    [InlineData(City.Nvz, Role.Admin)]
    public async void RolesCheck_NotValidCredentials_ThrowsException(City? city, Role role)
    {
        var validator = new UsersValidator();

        _parameters.City = city;
        _parameters.Role = role;
        
        await Assert.ThrowsAsync<ValidationException>(() => validator.ValidateAndThrowAsync(_parameters));
        
        _parameters.City = null;
        _parameters.Role = Role.Admin;
    }

    /// <summary>
    /// Проверка валидации почты
    /// </summary>
    /// <param name="email">Почта</param>
    [Theory]
    [AutoData]
    public async void EmailValidation_NotValidEmail_ThrowsException(string email)
    {
        var validator = new UsersValidator();

        _parameters.Email = email;

        await Assert.ThrowsAsync<ValidationException>(() => validator.ValidateAndThrowAsync(_parameters));
    }
}