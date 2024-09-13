POST http://localhost:5271/api/admin/auth
Content-Type: application/json
{
    "email": "{{ADMIN_EMAIL}}",
    "password": "{{ADMIN_PASSWORD}}"
}

HTTP 200
[Captures]
token: jsonpath "$['token']"

POST http://localhost:5271/api/admin/images
Authorization: Bearer {{token}}
[MultipartFormData]
image: file, fixtures/test.jpeg; image/jpeg

HTTP 200
[Captures]
cover_url: jsonpath "$.url"
cover_id: jsonpath "$.id"

POST http://localhost:5271/api/admin/images
Authorization: Bearer {{token}}
[MultipartFormData]
image: file, fixtures/test.jpeg; image/jpeg

HTTP 200
[Captures]
image_url: jsonpath "$.url"
image_id: jsonpath "$.id"

POST http://localhost:5271/api/admin/news
Content-Type: application/json
Authorization: Bearer {{token}}
{
    "titles": {
        "ru": "rgbwsedas",
        "en": "TEST"
    },
    "descriptions": {
        "ru": "TEST",
        "en": "TEST"
    },
    "publishedAt": "2023-02-20T00:00:00",
    "coverId": "{{cover_id}}",
    "imageIds": [
        "{{image_id}}"
    ]
}

HTTP 201

GET http://localhost:5271/api/admin/news
Content-Type: application/json
Authorization: Bearer {{token}}
[QueryStringParams]
search: rgbwsedas
page: 0
pageSize: 1

HTTP 200
[Captures]
id: jsonpath "$.data[0].id"
cover_id: jsonpath "$.data[0].cover.id"
image_id: jsonpath "$.data[0].images[0].id"

PUT http://localhost:5271/api/admin/news/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}
{
    "titles": {
        "ru": "test",
        "en": "test"
    },
    "descriptions": {
        "ru": "test",
        "en": "test"
    },
    "publishedAt": "2023-02-21T00:00:00",
    "coverId": "{{cover_id}}",
    "imageIds": [
        "{{image_id}}"
    ]
}

HTTP 204

GET http://localhost:5271/api/admin/news/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 200
[Asserts]
jsonpath "$.titles.ru" == "test"
jsonpath "$.titles.en" == "test"
jsonpath "$.descriptions.ru" == "test"
jsonpath "$.descriptions.en" == "test"
jsonpath "$.cover.id" == {{cover_id}}
jsonpath "$.images[0].id" == {{image_id}}

DELETE http://localhost:5271/api/admin/news/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 204

GET http://localhost:5271/api/admin/news/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 404