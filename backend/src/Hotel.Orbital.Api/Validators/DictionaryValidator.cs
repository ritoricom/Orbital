using Entities.Enums;
using FluentValidation;

namespace Api.Validators;

/// <summary>
/// Валидатор словаря
/// </summary>
public class DictionaryValidator : AbstractValidator<Dictionary<Language, string>>
{
    /// <summary/>
    public DictionaryValidator()
    {
        RuleFor(dictionary => dictionary.Keys)
            .Must(keys => keys.Contains(Language.Ru) && keys.Contains(Language.En))
            .WithMessage("Все поля должны быть заполнены");
        RuleFor(dictionary => dictionary.Values)
            .ForEach(value => value.NotNull().NotEmpty().WithMessage("Поле не дожно быть пустым"));
    }
}