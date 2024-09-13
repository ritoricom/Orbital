using Core.Models;
using FluentValidation;

namespace Api.Validators;

/// <summary>
/// Валидатор новостей
/// </summary>
public class NewsValidator : AbstractValidator<NewsCreateParameters>
{
    /// <summary/>
    public NewsValidator()
    {
        RuleFor(news => news.Titles).NotNull().SetValidator(new DictionaryValidator());
        RuleFor(news => news.Descriptions).NotNull().SetValidator(new DictionaryValidator());
        RuleFor(news => news.CoverId).NotNull().NotEqual(Guid.Empty);
        RuleFor(news => news.ImageIds).NotNull().Must(news => news.Count > 0).WithMessage("Изображения не добавлены");
        RuleFor(news => news.PublishedAt).NotNull();
    }
}