using System.ComponentModel;

namespace Core.Enums;

/// <summary>
/// События для логированя
/// </summary>
public enum LoggingEvents
{
    [Description("Пользователь вошел в систему")]
    Auth,
    
    [Description("Создан пользователь")]
    CreateUser,
    
    [Description("Изменен пользователь")]
    UpdateUser,
    
    [Description("Удален пользователь")]
    DeleteUser,
    
    [Description("Изменены контакты города")]
    UpdateContacts,
    
    [Description("Добавлена фотография города")]
    CreateHotelImage,
    
    [Description("Удалена фотография города")]
    DeleteHotelImage,
    
    [Description("Выполнена синхронизация номеров")]
    Synchronize,
    
    [Description("Добалена почта в рассылку")]
    CreateNewsletter,
    
    [Description("Изменена почта в рассылке")]
    UpdateNewsletter,
    
    [Description("Удалена почта из рассылки")]
    DeleteNewsletter,
    
    [Description("Создана новость")]
    CreateNews,
    
    [Description("Изменена новость")]
    UpdateNews,
    
    [Description("Удалена новость")]
    DeleteNews,
    
    [Description("Создан отзыв")]
    CreateReview,
    
    [Description("Изменен отзыв")]
    UpdateReview,
    
    [Description("Удален отзыв")]
    DeleteReview,
    
    [Description("Изменена обложка номера")]
    UpdateRoomCover,
    
    [Description("Добавлено спецпредложение")]
    CreateSpecialOffer,
    
    [Description("Изменено спецпредложение")]
    UpdateSpecialOffer,
    
    [Description("Удалено спецпредложение")]
    DeleteSpecialOffer,
    
    [Description("Изменен пароль пользователя")]
    UpdatePassword,
    
    [Description("Добавлен досуг")]
    CreateLeisure,
    
    [Description("Изменен досуг")]
    UpdateLeisure,
    
    [Description("Удален досуг")]
    DeleteLeisure
}