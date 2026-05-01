# How to Hack it

1. Register a user `dub-flow"><script>alert(1337)</script>`. This automatically logs you in and redirects you to `/me`. Notice the XSS payload triggering (self-XSS!)
2. Notice that the payload also triggers when you visit `/me.css` (while still being logged in)
3. Open `localhost/me.css` in a different web browser and notice that the XSS payload is cached and still fires