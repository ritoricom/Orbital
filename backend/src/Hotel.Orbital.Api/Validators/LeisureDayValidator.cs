using Entities;
using FluentValidation;

namespace Api.Validators;

/// <summary>
/// Валидатор дней досуга
/// </summary>
public class LeisureDayValidator : AbstractValidator<LeisureDay>
{
    /// <summary/>
    public LeisureDayValidator()
    {
        RuleFor(leisureDay => leisureDay.Title).NotEmpty();
        RuleFor(leisureDay => leisureDay.Description).NotEmpty();
    }
}