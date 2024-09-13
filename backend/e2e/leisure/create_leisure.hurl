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
    "title": "ohwsfwui",
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
search: ohwsfwui
page: 0
pageSize: 1

HTTP 200
[Captures]
id: jsonpath "$.data[0].id"

GET http://localhost:5271/api/admin/leisures/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 200
[Asserts]
jsonpath "$.title" == "ohwsfwui"
jsonpath "$.description" == "TEST"
jsonpath "$.note" == "TEST"
jsonpath "$.route" == "TEST"
jsonpath "$.phoneNumber" == "1234567890"
jsonpath "$.email" == "temp@temp.com"
jsonpath "$.cover.id" == {{cover_id}}
jsonpath "$.images[0].id" == {{image_id}}
jsonpath "$.days[0].title" == "TEST"
jsonpath "$.days[0].timeAndPlace" == "TEST"
jsonpath "$.days[0].duration" == "TEST"
jsonpath "$.days[0].host" == "TEST"
jsonpath "$.days[0].description" == "TEST"

DELETE http://localhost:5271/api/admin/leisures/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 204

GET http://localhost:5271/api/admin/leisures/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 404