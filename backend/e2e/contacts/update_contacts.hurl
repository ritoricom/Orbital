POST http://localhost:5271/api/admin/auth
Content-Type: application/json
{
    "email": "{{ADMIN_EMAIL}}",
    "password": "{{ADMIN_PASSWORD}}"
}

HTTP 200
[Captures]
token: jsonpath "$['token']"

GET http://localhost:5271/api/admin/contacts/nvz
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 200
[Captures]
email: jsonpath "$.email"
phone: jsonpath "$.phone"
latitude: jsonpath "$.location.latitude"
longitude: jsonpath "$.location.longitude"
vk_link: jsonpath "$.vkLink"
address_ru: jsonpath "$.addresses.ru"
address_en: jsonpath "$.addresses.en"

PUT http://localhost:5271/api/admin/contacts
Content-Type: application/json
Authorization: Bearer {{token}}
{
    "city": "nvz",
    "addresses": {
        "ru": "тест",
        "en": "test"
    },
    "email": "test@test.ru",
    "phone": "1234567890",
    "location": {
        "latitude": 0,
        "longitude": 0
    },
    "vkLink": "http://test.com"
}

HTTP 204

GET http://localhost:5271/api/admin/contacts/nvz
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 200
[Asserts]
jsonpath "$.email" == "test@test.ru"
jsonpath "$.phone" == "1234567890"
jsonpath "$.vkLink" == "http://test.com"
jsonpath "$.addresses.ru" == "тест"
jsonpath "$.addresses.en" == "test"

PUT http://localhost:5271/api/admin/contacts
Content-Type: application/json
Authorization: Bearer {{token}}
{
    "city": "nvz",
    "addresses": {
        "ru": "{{address_ru}}",
        "en": "{{address_en}}"
    },
    "email": "{{email}}",
    "phone": "{{phone}}",
    "location": {
            "latitude": {{latitude}},
            "longitude": {{longitude}}
    },
    "vkLink": "{{vk_link}}"
}

HTTP 204

GET http://localhost:5271/api/admin/contacts/nvz
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 200
[Asserts]
jsonpath "$.email" == {{email}}
jsonpath "$.phone" == {{phone}}
jsonpath "$.vkLink" == {{vk_link}}
jsonpath "$.addresses.ru" == {{address_ru}}
jsonpath "$.addresses.en" == {{address_en}}