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
cover_id: jsonpath "$.id"

POST http://localhost:5271/api/admin/images
Authorization: Bearer {{token}}
[MultipartFormData]
image: file, fixtures/test.jpeg; image/jpeg

HTTP 200
[Captures]
image_id: jsonpath "$.id"

POST http://localhost:5271/api/admin/special-offers
Content-Type: application/json
Authorization: Bearer {{token}}
{
    "titles": {
        "ru": "lmkhvkshgsd",
        "en": "TEST"
    },
    "shortDescriptions": {
        "ru": "TEST",
        "en": "TEST"
    },
    "descriptions": {
        "ru": "TEST",
        "en": "TEST"
    },
    "notes": {
        "ru": "TEST",
        "en": "TEST"
    },
    "coverId": "{{cover_id}}",
    "imageIds": [
        "{{image_id}}"
    ]
}

HTTP 201

GET http://localhost:5271/api/admin/special-offers
Content-Type: application/json
Authorization: Bearer {{token}}
[QueryStringParams]
search: lmkhvkshgsd
page: 0
pageSize: 1

HTTP 200
[Captures]
id: jsonpath "$.data[0].id"
cover_url: jsonpath "$.data[0].cover.url"
image_url: jsonpath "$.data[0].images[0].url"

DELETE http://localhost:5271/api/admin/special-offers/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 204

GET http://localhost:5271/api/admin/special-offers/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 404

GET {{cover_url}}

HTTP 404

GET {{image_url}}

HTTP 404