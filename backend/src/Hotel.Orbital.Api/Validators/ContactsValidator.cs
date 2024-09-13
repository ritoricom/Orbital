using Core.Models;
using FluentValidation;

namespace Api.Validators;

/// <summary>
/// Валидатор контактов
/// </summary>
public class ContactsValidator : AbstractValidator<ContactsUpdateParameters>
{
    /// <summary/>
    public ContactsValidator()
    {
        RuleFor(contacts => contacts.Addresses).NotNull().SetValidator(new DictionaryValidator());
        RuleFor(contacts => contacts.City).NotNull();
        RuleFor(contacts => contacts.Email).NotEmpty().EmailAddress();
        RuleFor(contacts => contacts.Location).NotNull();
        RuleFor(contacts => contacts.Phone).NotEmpty();
        RuleFor(contacts => contacts.VkLink).NotEmpty();
    }
}