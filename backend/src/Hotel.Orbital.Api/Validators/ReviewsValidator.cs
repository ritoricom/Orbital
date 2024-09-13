using Core.Models;
using FluentValidation;

namespace Api.Validators;

/// <summary>
/// Валидатор отзывов
/// </summary>
public class ReviewsValidator : AbstractValidator<ReviewCreateParameters>
{
    /// <summary/>
    public ReviewsValidator()
    {
        RuleFor(review => review.City).NotNull();
        RuleFor(review => review.Authors).NotNull().SetValidator(new DictionaryValidator());
        RuleFor(review => review.Headers).NotNull().SetValidator(new DictionaryValidator());
        RuleFor(review => review.Descriptions).NotNull().SetValidator(new DictionaryValidator());
        RuleFor(review => review.PublishedAt).NotNull();
        RuleFor(review => review.Grade)
            .Must(grade => grade >= 1 && grade <= 5).WithMessage("Допустимые значения от 1 до 5");
    }
}