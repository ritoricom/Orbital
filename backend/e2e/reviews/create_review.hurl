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
        "ru": "kasiajswiod",
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
search: kasiajswiod
page: 0
pageSize: 1

HTTP 200
[Captures]
id: jsonpath "$.data[0].id"

GET http://localhost:5271/api/admin/reviews/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 200
[Asserts]
jsonpath "$.authors.ru" == "TEST"
jsonpath "$.authors.en" == "TEST"
jsonpath "$.headers.ru" == "kasiajswiod"
jsonpath "$.headers.en" == "TEST"
jsonpath "$.descriptions.ru" == "TEST"
jsonpath "$.descriptions.en" == "TEST"
jsonpath "$.grade" == 5

DELETE http://localhost:5271/api/admin/reviews/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 204

GET http://localhost:5271/api/admin/reviews/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 404