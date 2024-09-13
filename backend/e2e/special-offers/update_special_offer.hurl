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
        "ru": "dtyuyubvnmh",
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
search: dtyuyubvnmh
page: 0
pageSize: 1

HTTP 200
[Captures]
id: jsonpath "$.data[0].id"
cover_id: jsonpath "$.data[0].cover.id"
image_id: jsonpath "$.data[0].images[0].id"

PUT http://localhost:5271/api/admin/special-offers/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}
{
    "titles": {
        "ru": "test",
        "en": "test"
    },
    "shortDescriptions": {
        "ru": "test",
        "en": "test"
    },
    "descriptions": {
        "ru": "test",
        "en": "test"
    },
    "notes": {
        "ru": "test",
        "en": "test"
    },
    "phoneNumber1": "1234567890",
    "phoneNumber2": "1234567890",
    "coverId": "{{cover_id}}",
    "imageIds": [
        "{{image_id}}"
    ]
}

HTTP 204

GET http://localhost:5271/api/admin/special-offers/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 200
[Asserts]
jsonpath "$.titles.ru" == "test"
jsonpath "$.titles.en" == "test"
jsonpath "$.descriptions.ru" == "test"
jsonpath "$.descriptions.en" == "test"
jsonpath "$.shortDescriptions.ru" == "test"
jsonpath "$.shortDescriptions.en" == "test"
jsonpath "$.notes.ru" == "test"
jsonpath "$.notes.en" == "test"
jsonpath "$.phoneNumber1" == "1234567890"
jsonpath "$.phoneNumber2" == "1234567890"
jsonpath "$.cover.id" == {{cover_id}}
jsonpath "$.images[0].id" == {{image_id}}

DELETE http://localhost:5271/api/admin/special-offers/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 204

GET http://localhost:5271/api/admin/special-offers/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 404