using System.Data;
using Core.Models;
using FluentValidation;

namespace Api.Validators;

/// <summary>
/// Валидатор досуга
/// </summary>
public class LeisureValidator : AbstractValidator<LeisureCreateParameters>
{
    /// <summary/>
    public LeisureValidator()
    {
        RuleFor(leisure => leisure.Title).NotEmpty();
        RuleFor(leisure => leisure.Description).NotEmpty();
        RuleFor(leisure => leisure.Email).EmailAddress().When(leisure => leisure.Email != null);
        RuleFor(leisure => leisure.Days)
            .ForEach(leisureDay => leisureDay.SetValidator(new LeisureDayValidator()));
        RuleFor(leisure => leisure.CoverId).NotNull().NotEqual(Guid.Empty);
        RuleFor(leisure => leisure.ImageIds).NotNull().Must(news => news.Count > 0).WithMessage("Изображения не добавлены");
    }
}