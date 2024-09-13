POST http://localhost:5271/api/admin/auth
Content-Type: application/json
{
    "email": "{{ADMIN_EMAIL}}",
    "password": "{{ADMIN_PASSWORD}}"
}

HTTP 200
[Captures]
token: jsonpath "$['token']"

POST http://localhost:5271/api/admin/users
Content-Type: application/json
Authorization: Bearer {{token}}
{
    "fullName": "test",
    "email": "l8euiwrhwas@temp.com",
    "role": "manager",
    "city": "spb",
    "password": "test"
}

HTTP 201

GET http://localhost:5271/api/admin/users
Content-Type: application/json
Authorization: Bearer {{token}}
[QueryStringParams]
search: l8euiwrhwas@temp.com
page: 0
pageSize: 1

HTTP 200
[Captures]
id: jsonpath "$.data[0].id"

DELETE http://localhost:5271/api/admin/users/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 204

GET http://localhost:5271/api/admin/users/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 404