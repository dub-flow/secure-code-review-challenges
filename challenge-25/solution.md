# My Solution

The app in this challenge is vulnerable to a classic NoSQL Injection because it uses untrusted JSON input directly as a MongoDB query filter. This allows logging in as any user without knowing their password by injecting the `$ne` operator (an example exploitation can be found in `./exploit.req`).

To remediate the NoSQL Injection, we avoid passing raw JSON directly into the MongoDB query filter. Instead, we use typed values to construct the query safely (see `./safe.go` for a secure version of the code).