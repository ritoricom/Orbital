using System;
using System.Collections;
using System.Collections.Generic;
using Api.Validators;
using Entities.Enums;
using FluentValidation;
using Xunit;

namespace Tests.Validators;

/// <summary>
/// Тесты для проверки валидатора <see cref="DictionaryValidator"/>
/// </summary>
public class DictionaryValidatorTests
{
    /// <summary>
    /// Проверка словоря на полноту данных
    /// </summary>
    [Theory]
    [InlineData("", "")]
    [InlineData("test", "")]
    [InlineData("", "test")]
    [InlineData(null, null)]
    [InlineData("test", null)]
    [InlineData(null, "test")]
    public async void DictionaryValidation_IncorrectFields_ThrowsException(string ru, string en)
    {
        var validator = new DictionaryValidator();

        var parameters = new Dictionary<Language, string>
        {
            { Language.Ru, ru },
            { Language.En, en }
        };

        await Assert.ThrowsAsync<ValidationException>(() => validator.ValidateAndThrowAsync(parameters));
    }
}