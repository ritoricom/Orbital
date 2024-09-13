using Core.Enums;
using System.Text.Json;
using Core.Extensions;
using Core.Interfaces;
using Core.Models;
using Core.Utils;
using Entities;
using Entities.Enums;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

/// <inheritdoc cref="IContactsService"/>
public class ContactsService : IContactsService
{
    /// <summary/>
    private readonly ApplicationContext _db;

    /// <summary/>
    private readonly IAccessService _accessService;

    /// <summary/>
    private readonly IChangeLogService _changeLogService;
    
    /// <summary/>
    public ContactsService(ApplicationContext db, IAccessService accessService, IChangeLogService changeLogService)
    {
        _db = db;
        _accessService = accessService;
        _changeLogService = changeLogService;
    }

    /// <inheritdoc/>
    public async Task<Contacts> Get(City city)
    {
        var contacts = await _db.Contacts
            .Include(c => c.Hotel)
            .SingleOrNotFoundAsync(c => c.Hotel.City == city);

        return contacts;
    }

    /// <inheritdoc/>
    public async Task Update(ContactsUpdateParameters parameters)
    {
        await _accessService.AssertAccessOrThrow(parameters.City);
        
        var contacts = await _db.Contacts
            .Include(c => c.Hotel)
            .SingleOrNotFoundAsync(c => c.Hotel.City == parameters.City);

       
        contacts.Addresses = JsonSerializer.SerializeToDocument(parameters.Addresses);
        contacts.Location = JsonSerializer.SerializeToDocument(parameters.Location);
        contacts.Email = parameters.Email;
        contacts.Phone = parameters.Phone;
        contacts.VkLink = parameters.VkLink;

        await _db.SaveChangesAsync();
        
        await _changeLogService.Create(LoggingEvents.UpdateContacts, parameters.City.GetDescription());
    }
}