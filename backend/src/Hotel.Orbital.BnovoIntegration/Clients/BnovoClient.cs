using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using BnovoIntegration.Extensions;
using BnovoIntegration.Models;
using Microsoft.AspNetCore.WebUtilities;

namespace BnovoIntegration.Clients;

/// <inheritdoc cref="IBnovoClient"/>
public class BnovoClient : IBnovoClient
{
    /// <summary/>
    private readonly HttpClient _httpClient;

    /// <summary/>
    private readonly BnovoOptions _options;

    /// <summary/>
    public BnovoClient(BnovoOptions options)
    {
        _options = options;
        _httpClient = new HttpClient();
        
        _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    }

    /// <inheritdoc/>
    public async Task<IEnumerable<RoomType>> GetActualRooms(int accountId, CancellationToken cancellationToken = default)
    {
        var publicRoomTypeDtos = (await GetPublicRoomTypes(accountId, cancellationToken: cancellationToken)).ToList();

        publicRoomTypeDtos.AsParallel().ForAll(GetRoomsImages);

        var token = await Authenticate(cancellationToken);
        
        var amenitiesRu = await GetAmenityNames(token, "ru", cancellationToken);
        var amenitiesEn = await GetAmenityNames(token, "en", cancellationToken);
        var privateRoomTypeDtos = (await GetPrivateRoomTypes(token, accountId, cancellationToken)).ToList();

        var roomTypes = new List<RoomType>();

        foreach (var roomTypeDto in publicRoomTypeDtos)
        {
            var roomType = roomTypeDto.ToRoomType();

            var amenities = TryGetAmenities(roomTypeDto.Amenities.ToString());

            roomType.AmenitiesRu = amenities.Keys.Where(amenity => amenity != 1)
                .Select(amenity => amenitiesRu[amenity]);
            roomType.AmenitiesEn = amenities.Keys.Where(amenity => amenity != 1)
                .Select(amenity => amenitiesEn[amenity]);

            var privateRoomTypeDto = privateRoomTypeDtos.Single(room => room.Id == roomTypeDto.Id);

            roomType.Price = privateRoomTypeDto.Price;
            roomType.CreatedAt = DateTime.Parse(privateRoomTypeDto.CreatedAt);
            roomType.UpdatedAt = DateTime.Parse(privateRoomTypeDto.UpdatedAt);
            
            roomTypes.Add(roomType);
        }

        return roomTypes;
    }

    /// <summary>
    /// Аутентификация в API
    /// </summary>
    /// <param name="accoundId">Идентификатор аккаунта</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns>Токен для работы с API</returns>
    private async Task<string> Authenticate(CancellationToken cancellationToken = default)
    {
        var httpRequest = new HttpRequestMessage( HttpMethod.Post, _options.PrivateUrl + "/v1/api/auth");
        
        httpRequest.Content = JsonContent.Create(
            new
            {
                username = _options.Username, 
                password = _options.Password
            });
        
        httpRequest.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
        var tokenResponse = await SendRequest<TokenResponse>(httpRequest, cancellationToken: cancellationToken);

        return tokenResponse.Token;
    }

    /// <summary>
    /// Получения категорий номеров с публичного API
    /// </summary>
    /// <param name="accountId">Идентификатор аккаунта</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns>Номера с публичного API</returns>
    private async Task<IEnumerable<PublicRoomTypeDto>> GetPublicRoomTypes(int accountId, CancellationToken cancellationToken = default)
    {
        var query = new Dictionary<string, string>()
        {
            { "account_id", accountId.ToString() }
        };

        var requestUri = QueryHelpers.AddQueryString(_options.PublicUrl + "/v1/api/roomtypes", query);
        var httpRequest = new HttpRequestMessage(HttpMethod.Get, requestUri);
        var roomTypesListResponse = await SendRequest<RoomTypesPublicListResponse>(httpRequest, cancellationToken: cancellationToken);

        return roomTypesListResponse.RoomTypes.Where(roomType => roomType.ParentId == 0);
    }

    /// <summary>
    /// Загрузка изображений в виде массива байт
    /// </summary>
    /// <param name="image">Изображение</param>
    private void GetImageBytes(RoomTypeImage image)
    {
        var httpRequest = new HttpRequestMessage(HttpMethod.Get, image.Url);
        var httpResponse = _httpClient.Send(httpRequest);
        var response = httpResponse.Content.ReadAsStream();
        image.Content = response;
    }

    /// <summary>
    /// Получение изображений для категорий номеров
    /// </summary>
    /// <param name="roomType">Категория номеров</param>
    private void GetRoomsImages(PublicRoomTypeDto roomType)
    {
        if (roomType.Images == null) return;
        
        var images = roomType.Images;
        
        images.AsParallel().ForAll(GetImageBytes);
    }

    /// <summary>
    /// Получение списка всех возможных удобств на одном языке
    /// </summary>
    /// <param name="token">Токен авторизации</param>
    /// <param name="lang">Язык</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns>Список удобств на одном языке</returns>
    private async Task<Dictionary<int, string>> GetAmenityNames(string token, string lang,
        CancellationToken cancellationToken = default)
    {
        var query = new Dictionary<string, string>()
        {
            { "token", token },
            { "lang", lang }
        };
        
        var requestUri = QueryHelpers.AddQueryString(_options.PrivateUrl + "/v1/api/amenities", query);
        var httpRequest = new HttpRequestMessage(HttpMethod.Get, requestUri);
        var amenities = await SendRequest<AmenitiesResponse>(httpRequest, cancellationToken: cancellationToken);

        Dictionary<int, string> names = amenities.AmenityGroups
            .SelectMany(amenityGroup => amenityGroup.Value.Amenities)
            .ToDictionary(amenity => amenity.Key, amenity => amenity.Value.Name);
        
        return names;
    }

    /// <summary>
    /// Получение категорий номеров с приватного API (для получения цены, даты создания и изменения)
    /// </summary>
    /// <param name="token">Токен авторизации</param>
    /// <param name="accountId">Идентификатор аккаунта</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns>Категории номеров</returns>
    private async Task<IEnumerable<PrivateRoomTypeDto>> GetPrivateRoomTypes(string token, int accountId,
        CancellationToken cancellationToken = default)
    {
        var query = new Dictionary<string, string>()
        {
            { "token", token },
            { "account_id", accountId.ToString() }
        };
        
        var requestUri = QueryHelpers.AddQueryString(_options.PrivateUrl + "/v1/api/roomtypes", query);
        var httpRequest = new HttpRequestMessage(HttpMethod.Get, requestUri);
        var prices = await SendRequest<RoomTypesPrivateListResponse>(httpRequest, cancellationToken: cancellationToken);

        return prices.RoomTypes.Values.Where(roomType => roomType.ParentId == 0);
    }

    /// <summary>
    /// Отправка http запроса, получение ответ и чтение данных
    /// </summary>
    /// <param name="request">http-запрос</param>
    /// <param name="cancellationToken">Токен отмены</param>
    /// <returns>http-ответ</returns>
    private async Task<T> SendRequest<T>(HttpRequestMessage request,
        CancellationToken cancellationToken = default) where T : new()
    {
        var response = await _httpClient.SendAsync(request, cancellationToken);
        
        var content = await response.Content.ReadFromJsonAsync<T>(cancellationToken: cancellationToken);
        
        if (content == null) throw new ArgumentNullException(nameof(T));
        
        return content;
    }

    /// <summary>
    /// Получение особенностей категории номеров (т.к. поступают в виде словаря или пустого массива)
    /// </summary>
    /// <param name="json">Особенности в формате json</param>
    /// <returns>Особенности категории номеров в виде словаря</returns>
    /// <exception cref="ArgumentNullException"></exception>
    private Dictionary<int, object> TryGetAmenities(string json)
    {
        Dictionary<int, object> result;

        try
        {
            result = JsonSerializer.Deserialize<Dictionary<int, object>>(json);
        }
        catch (Exception e)
        {
            result = new Dictionary<int, object>();
        }

        if (result == null) throw new ArgumentNullException(nameof(result));

        return result;
    }
}