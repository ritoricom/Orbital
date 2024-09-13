using System;
using Api.Validators;
using AutoFixture.Xunit2;
using Core.Models;
using Entities.Enums;
using FluentValidation;
using Xunit;

namespace Tests.Validators;

/// <summary>
/// Тесты для проверки валидатора <see cref="NewslettersValidator"/>
/// </summary>
public class NewslettersValidatorTests
{
    /// <summary>
    /// Проверка ввода невалидной почты
    /// </summary>
    /// <param name="email">Почта</param>
    [Theory]
    [AutoData]
    public async void EmailValidation_NotValidEmail_ThrowsException(string email)
    {
        var validator = new NewslettersValidator();

        var parameters = new NewsletterCreateParameters
        {
            City = City.Nvz,
            Email = email
        };

        await Assert.ThrowsAsync<ValidationException>(() => validator.ValidateAndThrowAsync(parameters));
    }
}