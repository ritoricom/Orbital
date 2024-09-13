using System;
using System.Collections.Generic;
using Api.Validators;
using Core.Models;
using Entities.Enums;
using FluentValidation;
using Xunit;

namespace Tests.Validators;

/// <summary>
/// Тесты для проверки валидатора <see cref="SpecialOffersValidator"/>
/// </summary>
public class SpecialOffersValidatorTests
{
    /// <summary/>
    private SpecialOfferCreateParameters _parameters;

    /// <summary/>
    public SpecialOffersValidatorTests()
    {
        _parameters = new SpecialOfferCreateParameters
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
            ShortDescriptions = new Dictionary<Language, string>
            {
                { Language.Ru, "test" },
                { Language.En, "test" }
            },
            Notes = new Dictionary<Language, string?>
            {
                { Language.Ru, "test" },
                { Language.En, "test" }
            },
            CoverId = Guid.NewGuid(),
            ImageIds = new List<Guid>
            {
                Guid.NewGuid()
            }
        };
    }
    
    /// <summary>
    /// Проверка отсутствия обложки
    /// </summary>
    [Fact]
    public async void CoverIdValidation_EmptyGuid_ThrowsException()
    {
        var validator = new SpecialOffersValidator();

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
        var validator = new SpecialOffersValidator();

        _parameters.ImageIds = new List<Guid>();
        
        await Assert.ThrowsAsync<ValidationException>(() => validator.ValidateAndThrowAsync(_parameters));
        
        _parameters.ImageIds = new List<Guid>
        {
            Guid.NewGuid()
        };
    }

    /// <summary>
    /// Проверка валидации заметок
    /// </summary>
    [Theory]
    [InlineData("test", "test")]
    [InlineData("", "test")]
    [InlineData("test", "")]
    [InlineData("", "")]
    [InlineData(null, "test")]
    [InlineData("test", null)]
    [InlineData(null, null)]
    public async void NotesValidation_ValidInput_CorrectResult(string ruNote, string enNote)
    {
        var validator = new SpecialOffersValidator();

        _parameters.Notes[Language.Ru] = ruNote;
        _parameters.Notes[Language.En] = enNote;

        await validator.ValidateAndThrowAsync(_parameters);
        
        Assert.True(true);
    }
}