using Core.Models;
using Entities.Enums;
using FluentValidation;

namespace Api.Validators;

/// <summary>
/// Валидатор пользователей
/// </summary>
public class UsersValidator : AbstractValidator<UserUpdateParameters>
{
    /// <summary/>
    public UsersValidator()
    {
        RuleFor(user => user.FullName).NotEmpty();
        RuleFor(user => user.Email).NotEmpty().EmailAddress();
        RuleFor(user => user.Role).NotNull();
        RuleFor(user => user.City).NotNull().When(user => user.Role == Role.Manager);
        RuleFor(user => user.City).Null().When(user => user.Role == Role.Admin);
    }
}