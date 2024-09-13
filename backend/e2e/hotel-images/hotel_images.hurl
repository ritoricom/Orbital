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
image_url: jsonpath "$.url"
image_id: jsonpath "$.id"

GET {{image_url}}

HTTP 200

POST http://localhost:5271/api/admin/hotel/images
Content-Type: application/json
Authorization: Bearer {{token}}
{
    "city": "nvz",
    "imageId": "{{image_id}}"
}

HTTP 204

GET {{image_url}}

HTTP 200

POST http://localhost:5271/api/admin/hotel/images/{{image_id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 204

GET {{image_url}}

HTTP 404

