using Core.Models;
using FluentValidation;

namespace Api.Validators;

/// <summary>
/// Валидатор рассылок
/// </summary>
public class NewslettersValidator : AbstractValidator<NewsletterCreateParameters>
{
    /// <summary/>
    public NewslettersValidator()
    {
        RuleFor(newsletter => newsletter.City).NotNull();
        RuleFor(newsletter => newsletter.Email).NotNull().EmailAddress();
    }
}