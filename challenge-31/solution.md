# How to Hack it

1. Register a user `dub-flow"><script>alert(1337)</script>`. This automatically logs you in and redirects you to `/me`. Notice the XSS payload triggering (self-XSS!)
2. Notice that the payload also triggers when you visit `/me.css` (while still being logged in)
3. Open `localhost/me.css` in a different web browser and notice that the XSS payload is cached and still fires

# How to Fix

There's no single fix here — the bug is a chain of three issues, and a proper remediation tackles each layer:

1. **Use an exact `/me` route, not a wildcard.** `app.All("/me*", ...)` matches `/me`, `/me.css`, `/me.png`, and anything else starting with `/me`, all returning the same HTML profile page. That's the core of the cache deception: the cache keys the response under `/me.css` and treats it like a static asset. Switch to `app.All("/me", ...)` so `/me.css` simply doesn't exist on the app side.

2. **Escape the username.** It's reflected straight into HTML via `fmt.Sprintf`, which is an XSS sink. Use `html.EscapeString(u)` (or a templating engine with auto-escaping) so attacker-controlled content can never break out of its context.

3. **Don't cache by file extension blindly.** The nginx config caches anything matching `\.(css|js|jpg|png|gif)$`, regardless of what the app says. Either have the app set `Cache-Control: private, no-store` on per-user responses and let nginx honor it (e.g., via `proxy_no_cache`/`proxy_cache_bypass`), or only cache responses that are actually served from a static directory (so `/static/foo.css` is cached, but never something proxied from the app).

As defense in depth, I'd also validate usernames against a strict allow-list at registration (e.g., `^[A-Za-z0-9_-]+$`) so HTML special characters can't end up in the database in the first place.