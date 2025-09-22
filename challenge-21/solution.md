# How to Exploit

So for this challenge to work, we assume that the admin user is currently logged in. To achieve this, you can visit http://localhost:3000/mock-login in your web browser which creates a dummy cookie like this: `auth=admin`. 

So we do:

1. Visit `http://localhost:3000/mock-login` so that the `auth cookie` is set
2. Visit the `./cors-exploit.html` file in the same web browser
3. Notice the secret API key being logged in the browser console (in a real-world scenario, we would send the API key to an attacker-controlled server)

# How to Fix It

The issue here is that the `Origin` header is reflected back as a trusted origin. To make things worse, 'Access-Control-Allow-Credentials' is also set to 'true' which means that a malicious actor can also read the responses of authenticated requests (i.e., requests that have the session cookie sent along).

This bypasses the Same-origin Policy, which means that any app can now send requests to our app and *read the response*!

So imagine you are visiting `https://evil.com` while being logged into `https://bank.com` and the hacker's website can just send requests to your banking app and read the responses. Sounds bad? Because it is.

To fix this, we want to ensure that we either do not allow cross-origin requests at all or only those from an allow-listed set of origins.

Also, unless there is a very good reason, the `SameSite` flag should be set to a more secure value such as `Strict`.
