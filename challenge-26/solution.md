# How to Hack it

The app in this challenge is vulnerable to Prototype Pollution. The '/update-profile' endpoint allows users to send arbitrary JSON in the request body. This data is merged directly into the user object using a custom 'merge()' function with no filtering.

And here's the problem:

The 'merge()' function doesn't check for dangerous keys like '__proto__', meaning we can pollute the global object prototype.

How?

1️⃣ Send a 'GET /admin' with a cookie 'username=guest'(simulates being logged in) and notice that you get a '403 Forbidden'

2️⃣ Abuse the prototype pollution vulnerability to make our 'guest' user an admin (see first screenshot)

3️⃣ Visit '/admin' again and notice that we now get a '200 OK' (see second screenshot)

# My Solution

To remediate the Prototype Pollution issue, the best approach is to avoid merging untrusted input directly into application objects. Instead, explicitly define which fields are allowed and assign them one by one.

If merging is absolutely necessary, you must block dangerous keys like '__proto__', 'constructor', and 'prototype' during the process. See the attached snippet for an example of how to implement this kind of filtering.

That said, relying on blocklists is generally considered a bad practice and should be avoided where possible.