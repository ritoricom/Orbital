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

POST http://localhost:5271/api/admin/special-offers
Content-Type: application/json
Authorization: Bearer {{token}}
{
    "titles": {
        "ru": "wsqqawsdfnj",
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
search: wsqqawsdfnj
page: 0
pageSize: 1

HTTP 200
[Captures]
id: jsonpath "$.data[0].id"

GET http://localhost:5271/api/admin/special-offers/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 200
[Asserts]
jsonpath "$.titles.ru" == "wsqqawsdfnj"
jsonpath "$.titles.en" == "TEST"
jsonpath "$.descriptions.ru" == "TEST"
jsonpath "$.descriptions.en" == "TEST"
jsonpath "$.shortDescriptions.ru" == "TEST"
jsonpath "$.shortDescriptions.en" == "TEST"
jsonpath "$.notes.ru" == "TEST"
jsonpath "$.notes.en" == "TEST"
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