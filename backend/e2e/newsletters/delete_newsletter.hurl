POST http://localhost:5271/api/admin/auth
Content-Type: application/json
{
    "email": "{{ADMIN_EMAIL}}",
    "password": "{{ADMIN_PASSWORD}}"
}

HTTP 200
[Captures]
token: jsonpath "$['token']"

POST http://localhost:5271/api/admin/newsletters
Content-Type: application/json
Authorization: Bearer {{token}}
{
    "email": "dfkjswbfasw@example.com",
    "city": "nvz"
}

HTTP 201

GET http://localhost:5271/api/admin/newsletters
Content-Type: application/json
Authorization: Bearer {{token}}
[QueryStringParams]
search: dfkjswbfasw@example.com
page: 0
pageSize: 1

HTTP 200
[Captures]
id: jsonpath "$.data[0].id"

DELETE http://localhost:5271/api/admin/newsletters/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 204

GET http://localhost:5271/api/admin/newsletters/{{id}}
Content-Type: application/json
Authorization: Bearer {{token}}

HTTP 404