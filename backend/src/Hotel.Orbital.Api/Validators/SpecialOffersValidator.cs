using Core.Models;
using Entities.Enums;
using FluentValidation;

namespace Api.Validators;

/// <summary>
/// Валидатор спецпредложений
/// </summary>
public class SpecialOffersValidator : AbstractValidator<SpecialOfferCreateParameters> 
{
    /// <summary/>
    public SpecialOffersValidator()
    {
        RuleFor(specialOffer => specialOffer.Titles).NotNull().SetValidator(new DictionaryValidator());
        RuleFor(specialOffer => specialOffer.ShortDescriptions).NotNull().SetValidator(new DictionaryValidator());
        RuleFor(specialOffer => specialOffer.Descriptions).NotNull().SetValidator(new DictionaryValidator());
        RuleFor(specialOffer => specialOffer.Notes)
            .NotNull()
            .Must(dict => dict.ContainsKey(Language.Ru) && dict.ContainsKey(Language.En))
            .WithMessage("Все поля должны быть заполнены");
        RuleFor(specialOffer => specialOffer.CoverId).NotNull().NotEqual(Guid.Empty);
        RuleFor(specialOffer => specialOffer.ImageIds).NotNull().Must(images => images.Count > 0).WithMessage("Изображения не добавлены");
    }
}