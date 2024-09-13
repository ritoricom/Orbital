POST http://localhost:5271/api/admin/auth
Content-Type: application/json
{
    "email": "{{ADMIN_EMAIL}}",
    "password": "{{ADMIN_PASSWORD}}"
}

HTTP 200
[Captures]
token: jsonpath "$['token']"

POST http://localhost:5271/api/admin/reviews
Content-Type: application/json
Authorization: Bearer {{token}}
{
    "city": "nvz",
    "authors": {
        "ru": "TEST",
        "en": "TEST"
    },
    "headers": {
        "ru": "saldkswkpad",
        "en": "TEST"
    },
    "descriptions": {
        "ru": "TEST",
        "en": "TEST"
    },
    "publishedAt": "2023-02-20T00:00:00",
    "grade": 5
}

HTTP 201

GET http://localhost:5271/api/admin/reviews
Content-Type: application/json
Authorization: Bearer {{token}}
[QueryStringParams]
search: saldkswkpad
page: 0
pageSize: 1

HTTP 200
[Captures]
id: jsonpath "$.data[0].id"

PUT http://localhost:5271/api/admin/reviews/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}
{
    "city": "nvz",
    "authors": {
        "ru": "test",
        "en": "test"
    },
    "headers": {
        "ru": "test",
        "en": "test"
    },
    "descriptions": {
        "ru": "test",
        "en": "test"
    },
    "publishedAt": "2023-02-20T00:00:00",
    "grade": 4
}

HTTP 204

GET http://localhost:5271/api/admin/reviews/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 200
[Asserts]
jsonpath "$.authors.ru" == "test"
jsonpath "$.authors.en" == "test"
jsonpath "$.headers.ru" == "test"
jsonpath "$.headers.en" == "test"
jsonpath "$.descriptions.ru" == "test"
jsonpath "$.descriptions.en" == "test"
jsonpath "$.grade" == 4

DELETE http://localhost:5271/api/admin/reviews/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 204

GET http://localhost:5271/api/admin/reviews/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 404