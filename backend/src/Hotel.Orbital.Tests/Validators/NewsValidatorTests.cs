using System;
using System.Collections.Generic;
using Api.Validators;
using Core.Models;
using Entities.Enums;
using FluentValidation;
using Xunit;

namespace Tests.Validators;

/// <summary>
/// Тесты для проверки валиатора <see cref="NewsValidator"/>
/// </summary>
public class NewsValidatorTests
{
    /// <summary/>
    private NewsCreateParameters _parameters;

    /// <summary/>
    public NewsValidatorTests()
    {
        _parameters = new NewsCreateParameters
        {
            Titles = new Dictionary<Language, string>
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
            CoverId = Guid.NewGuid(),
            ImageIds = new List<Guid>
            {
                Guid.NewGuid()
            }
        };
    }
    
    /// <summary>
    /// Провека отсутствия обложки
    /// </summary>
    [Fact]
    public async void CoverIdValidation_EmptyGuid_ThrowsException()
    {
        var validator = new NewsValidator();

        _parameters.CoverId = Guid.Empty;

        await Assert.ThrowsAsync<ValidationException>(() => validator.ValidateAndThrowAsync(_parameters));
        
        _parameters.CoverId = Guid.NewGuid();
    }
    
    /// <summary>
    /// Проверка отсутствия изображений
    /// </summary>
    [Fact]
    public async void ImageListValidation_EmptyList_ThrowsException()
    {
        var validator = new NewsValidator();

        _parameters.ImageIds = new List<Guid>();

        await Assert.ThrowsAsync<ValidationException>(() => validator.ValidateAndThrowAsync(_parameters));
        
        _parameters.ImageIds = new List<Guid>
        {
            Guid.NewGuid()
        };
    }
}