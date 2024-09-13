using System;
using System.Collections.Generic;
using Api.Validators;
using AutoFixture.Xunit2;
using Core.Models;
using Entities.Enums;
using FluentValidation;
using Xunit;

namespace Tests.Validators;

/// <summary>
/// Тесты для прверки валидатора <see cref="ReviewsValidator"/>
/// </summary>
public class ReviewsValidatorTests
{
    /// <summary>
    /// Проверка валидации оценки
    /// </summary>
    /// <param name="grade">Оценка</param>
    [Theory]
    [InlineData(6)]
    [InlineData(0)]
    [InlineData(-2)]
    [InlineData(10)]
    public async void GradeValidation_NotValidGrade_ThrowsException(int grade)
    {
        var validator = new ReviewsValidator();

        var parameters = new ReviewCreateParameters
        {
            Authors = new Dictionary<Language, string>
            {
                { Language.Ru, "test" },
                { Language.En, "test" }
            },
            Headers = new Dictionary<Language, string>
            {
                { Language.Ru, "test" },
                { Language.En, "test" }
            },
            Descriptions = new Dictionary<Language, string>
            {
                { Language.Ru, "test" },
                { Language.En, "test" }
            },
            PublishedAt = DateTimeOffset.Now,
            Grade = grade
        };

        await Assert.ThrowsAsync<ValidationException>(() => validator.ValidateAndThrowAsync(parameters));
    }
}