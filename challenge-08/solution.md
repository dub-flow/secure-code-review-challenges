# My Solution

So... What's the problem with this innocent-looking Nginx configuration? The answer is path normalization. Say someone visits `https://<host>/html../nginx.conf`. Remember that `/html` is an alias for `/usr/share/nginx/html/` which means that Nginx would interpret this as `/usr/share/nginx/html/../nginx.conf`. Thus, an attacker can break out of the designated path and we have a classic LFI vulnerability.

To remediate this, we can e.g. change the alias to something like this:

```
location /html/ {
 root /usr/share/nginx/html;
}
```

Now, if an attacker again visits `https://<host>/html../nginx.conf`, Nginx would not map this to our `/html/` rule anymore, and throw a 404.
