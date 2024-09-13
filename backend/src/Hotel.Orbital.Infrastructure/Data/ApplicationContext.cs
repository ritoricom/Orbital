using Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

/// <summary>
/// Контекст подключения к БД
/// </summary>
public class ApplicationContext : DbContext
{
    #pragma warning disable CS8618
    
    /// <summary>
    /// Гостиницы
    /// </summary>
    public virtual DbSet<Hotel> Hotels { get; set; }

    /// <summary>
    /// Номера
    /// </summary>
    public virtual DbSet<Room> Rooms { get; set; }

    /// <summary>
    /// Изображения
    /// </summary>
    public virtual DbSet<Image> Images { get; set; }

    /// <summary>
    /// Новости
    /// </summary>
    public virtual DbSet<News> News { get; set; }
    
    /// <summary>
    /// Спецпредложения
    /// </summary>
    public virtual DbSet<SpecialOffer> SpecialOffers { get; set; }

    /// <summary>
    /// Отзывы
    /// </summary>
    public virtual DbSet<Review> Reviews { get; set; }

    /// <summary>
    /// Рассылки
    /// </summary>
    public virtual DbSet<Newsletter> Newsletters { get; set; }

    /// <summary>
    /// Пользователи
    /// </summary>
    public virtual DbSet<User> Users { get; set; }

    /// <summary>
    /// Контакты
    /// </summary>
    public virtual DbSet<Contacts> Contacts { get; set; }
    
    /// <summary>
    /// Досуг
    /// </summary>
    public virtual DbSet<Leisure> Leisures { get; set; }
    
    /// <summary>
    /// Журнал изменений
    /// </summary>
    public virtual DbSet<ChangeLog> ChangeLog { get; set; }

    /// <summary>
    /// Гелереи изображений гостиниц
    /// </summary>
    public virtual DbSet<HotelGallery> HotelGalleries { get; set; }
    
    /// <summary>
    /// Гелереи изображений номеров
    /// </summary>
    public virtual DbSet<RoomGallery> RoomGalleries { get; set; }

    /// <summary>
    /// Гелереи изображений новостей
    /// </summary>
    public virtual DbSet<NewsGallery> NewsGalleries { get; set; }

    /// <summary>
    /// Гелереи изображений спецпредложений
    /// </summary>
    public virtual DbSet<SpecialOfferGallery> SpecialOfferGalleries { get; set; }
    
    /// <summary>
    /// Галереи изображений досуга
    /// </summary>
    public virtual DbSet<LeisureGallery> LeisureGalleries { get; set; }
    
    /// <summary>
    /// Обложки номеров
    /// </summary>
    public virtual DbSet<RoomCover> RoomCovers { get; set; }
    
    /// <summary>
    /// Обложки досуга
    /// </summary>
    public virtual DbSet<LeisureCover> LeisureCovers { get; set; }
    
    /// <summary>
    /// Обложки новостей
    /// </summary>
    public virtual DbSet<NewsCover> NewsCovers { get; set; }
    
    /// <summary>
    /// Обложки спецпредложений
    /// </summary>
    public virtual DbSet<SpecialOfferCover> SpecialOfferCovers { get; set; }
    
    /// <summary/>
    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
    {
        
    }
    
    /// <summary/>
    protected override void OnModelCreating(ModelBuilder modelBuilder) { }
}