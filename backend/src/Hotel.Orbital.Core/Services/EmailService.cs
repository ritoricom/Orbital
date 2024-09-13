using Core.Interfaces;
using Core.Models;
using Core.Options;
using EmailSender.Interfaces;
using EmailSender.Models;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

/// <inheritdoc cref="IEmailService"/>
public class EmailService : IEmailService
{
    /// <summary/>
    private readonly ApplicationContext _context;

    /// <summary/>
    private readonly ISender _sender;

    /// <summary/>
    private readonly HtmlTemplateOptions _options;

    /// <summary/>
    public EmailService(ApplicationContext context, ISender sender, HtmlTemplateOptions options)
    {
        _context = context;
        _sender = sender;
        _options = options;
    }

    /// <inheritdoc/>
    public async Task SendAsync(EmailCreateParameters parameters, CancellationToken cancellationToken = default)
    {
        var addresses = await _context.Newsletters
            .Include(newsletter => newsletter.Hotel)
            .Where(newsletter => newsletter.Hotel.City == parameters.City)
            .Select(newsletter => newsletter.Email)
            .ToListAsync(cancellationToken: cancellationToken);

        var html = GetHtmlTemplate();

        html = html
            .Replace("[name]", parameters.Name)
            .Replace("[phone]", parameters.Phone);

        var mailRequest = new MailRequest
        {
            Subject = "Новая заявка",
            Body = html,
            IsHtmlBody = true
        };

        await _sender.SendAsync(addresses, mailRequest, cancellationToken);
    }

    /// <summary/>
    private string GetHtmlTemplate()
    {
        using var sr = new StreamReader(Directory.GetCurrentDirectory() + _options.Path);

        var html = sr.ReadToEnd();

        return html;
    }
}