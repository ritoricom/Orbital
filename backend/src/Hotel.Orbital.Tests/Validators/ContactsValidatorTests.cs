using System;
using System.Collections.Generic;
using Api.Validators;
using AutoFixture.Xunit2;
using Core.Models;
using Entities;
using Entities.Enums;
using FluentValidation;
using Xunit;

namespace Tests.Validators;

/// <summary>
/// Тесты для проверки валидатора <see cref="ContactsValidator"/>
/// </summary>
public class ContactsValidatorTests
{
    /// <summary>
    /// Проверка ввода невалидной почты
    /// </summary>
    /// <param name="email">Почта</param>
    [Theory]
    [AutoData]
    public async void EmailValidation_NotValidEmail_ThrowsException(string email)
    {
        var validator = new ContactsValidator();

        var parameters = new ContactsUpdateParameters
        {
            Addresses = new Dictionary<Language, string>
            {
                { Language.Ru, "test" },
                { Language.En, "test" }
            },
            City = City.Nvz,
            Email = email,
            Phone = "1234567890",
            VkLink = "http://vk.com",
            Location = new Point()
        };

        await Assert.ThrowsAsync<ValidationException>(() => validator.ValidateAndThrowAsync(parameters));
    }
}