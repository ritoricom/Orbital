using EmailSender.Interfaces;
using EmailSender.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace EmailSender.Services;

/// <inheritdoc cref="ISender"/>
public class MailKitSender : ISender
{
    /// <summary/>
    private readonly MailKitOptions _options;

    /// <summary/>
    public MailKitSender(MailKitOptions options)
    {
        _options = options;
    }
    
    /// <inheritdoc/>
    public async Task SendAsync(string emailAddress, MailRequest request , CancellationToken cancellationToken = default)
    {
        var message = CreateMailMessage(request);
        
        message.To.Add(MailboxAddress.Parse(emailAddress));

        await SendBySmtpAsync(message, cancellationToken);
    }
    
    /// <inheritdoc/>
    public async Task SendAsync(IEnumerable<string> emailAddresses, MailRequest request , CancellationToken cancellationToken = default)
    {
        var message = CreateMailMessage(request);
        
        foreach (var mailAddress in emailAddresses)
            message.To.Add(MailboxAddress.Parse(mailAddress));
        
        await SendBySmtpAsync(message, cancellationToken);
    }
    
    /// <summary/>
    private MimeMessage CreateMailMessage(MailRequest request)
    {
        var message = new MimeMessage();
        
        message.From.Add(new MailboxAddress(_options.DisplayName, _options.From));
        message.Sender = new MailboxAddress(_options.DisplayName, _options.From);

        var body = new BodyBuilder();

        message.Subject = request.Subject;

        if (request.IsHtmlBody)
        {
            body.HtmlBody = request.Body;
        }
        else
        {
            body.TextBody = request.Body;
        }
        
        message.Body = body.ToMessageBody();

        return message;
    }

    /// <summary/>
    private async Task SendBySmtpAsync(MimeMessage message, CancellationToken cancellationToken)
    {
        using var smtp = new SmtpClient();
        
        if (_options.UseSSL)
        {
            await smtp.ConnectAsync(_options.Host, _options.Port, SecureSocketOptions.SslOnConnect, cancellationToken);
        }
        else if (_options.UseStartTls)
        {
            await smtp.ConnectAsync(_options.Host, _options.Port, SecureSocketOptions.StartTls, cancellationToken);
        }
        else
        {
            await smtp.ConnectAsync(_options.Host, _options.Port, SecureSocketOptions.Auto, cancellationToken);
        }
        
        await smtp.AuthenticateAsync(_options.UserName, _options.Password, cancellationToken);
        await smtp.SendAsync(message, cancellationToken);
        await smtp.DisconnectAsync(true, cancellationToken);
    }
}