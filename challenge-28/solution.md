# How to Hack it

The app in this challenge is vulnerable to Web Cache Deception. To exploit this, do the following:

1. Navigate to http://localhost:5000/login and log in as an admin ("admin:password")
2. As admin, go to http://localhost/profile/dubflowww1w.css

This renders the admin's profile, which contains the secret API key (which we want to steal!). Now you might be wondering why "/profile/GIBBERISH" renders the profile... The reason is that little "*" in `./main.js` at line 52.

This matches every route that starts with "/profile", i.e. the profile page is rendered for every route that starts with "/profile". 

And why "dubflowww1w.css"? Well, because my hacker name is "dub-flow" and because ".css" makes our request appear to ask for a static file. And static files will be cached by Nginx, due to this configuration in the "nginx.conf" from lines 17 to 25.

Realistic Attack Scenario:

- Hacker sends a malicious email to the admin user, making them click on the link: http://localhost/profile/dubflowww1w.css (the admin must be logged into the app while clicking)
- http://localhost/profile/dubflowww1w.css renders the admin's API key, because the Express.js backend treats it as a request to "/profile". At the same time, Nginx is like "Oh, a CSS file, I'mma cache that!". 
- Finally, the hacker visits http://localhost/profile/dubflowww1w.css themselves, and they see the admin's API key. So how can the hacker see the admin's API key without being logged in? Because Nginx cached that "CSS file" so the request is not even hitting the Express backend (classic Web Cache Deception).

# My Solution

### General Mitigation Strategies:

There are 2 general ways to mitigate Web Cache Deception:

1. Don't use a web cache 😜

Can't be vulnerable to web cache attacks if you don't use a web cache.

2. Limit what's being cached

Make sure you're only caching static resources that aren't security-sensitive. This is important as requests that hit the cache don't even go to your backend, so you can't perform things like authentication checks.

### Concrete Mitigation for our Challenge:

In the challenge, the problem is that we can trick the web cache into caching HTTP responses that aren't actually static resources (we go to http://localhost/profile/dubflowww1w.css, and the web cache thinks this is a static CSS file).

To mitigate this, we need to get rid of the `/profile*` wildcard, i.e. this needs to be changed to `/profile`. I know using a wildcard like this feels a bit odd in the first place, but I see it all the time in the wild.

On top of that, and even more important, HTTP responses from our backend API should never be cached in the first place. Have a separate location for your static stuff, maybe an S3 bucket, and throw a cache in front of that. Get rid of the web cache in front of your API to avoid the risk of (potentially sensitive) caching any API responses whatsoever.