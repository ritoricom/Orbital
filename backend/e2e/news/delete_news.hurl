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
        "ru": "klsgfjsdjej",
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
search: klsgfjsdjej
page: 0
pageSize: 1

HTTP 200
[Captures]
id: jsonpath "$.data[0].id"
cover_url: jsonpath "$.data[0].cover.url"
image_url: jsonpath "$.data[0].images[0].url"

GET {{cover_url}}

HTTP 200

GET {{image_url}}

HTTP 200

DELETE http://localhost:5271/api/admin/news/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 204

GET http://localhost:5271/api/admin/news/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 404

GET {{cover_url}}

HTTP 404

GET {{image_url}}

HTTP 404