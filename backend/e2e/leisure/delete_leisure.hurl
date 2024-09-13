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

POST http://localhost:5271/api/admin/leisures
Content-Type: application/json
Authorization: Bearer {{token}}
{
    "title": "jjsedafa",
    "description": "TEST",
    "note": "TEST",
    "route": "TEST",
    "phoneNumber": "1234567890",
    "email": "temp@temp.com",
    "coverId": "{{cover_id}}",
    "imageIds": [
        "{{image_id}}"
    ],
    "days": [
        {
            "title": "TEST",
            "timeAndPlace": "TEST",
            "duration": "TEST",
            "host": "TEST",
            "description": "TEST"
        }
    ]
}

HTTP 201

GET http://localhost:5271/api/admin/leisures
Content-Type: application/json
Authorization: Bearer {{token}}
[QueryStringParams]
search: jjsedafa
page: 0
pageSize: 1

HTTP 200
[Captures]
id: jsonpath "$.data[0].id"

GET http://localhost:5271/api/admin/leisures/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 200
[Captures]
cover_url: jsonpath "$.cover.url"
image_url: jsonpath "$.images[0].url"

GET {{cover_url}}

HTTP 200

GET {{image_url}}

HTTP 200

DELETE http://localhost:5271/api/admin/leisures/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 204

GET http://localhost:5271/api/admin/leisures/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 404

GET {{cover_url}}

HTTP 404

GET {{image_url}}

HTTP 404