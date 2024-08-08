# My Solution

The problem here is that Flask and Nginx may disagree on what characters are allowed in a path. For example, Nginx@1.25.5 says that `\x85` and `\xa0` are valid characters for a path, whereas Flask says "Nah, they are not".

This means if you block `/admin` in Nginx and do it incorrectly, an attacker may visit `/admin\x85`. Now, Nginx thinks "ok, that's not '/admin' so I will let this go through". But Flask says "'\x85' is not a valid path character, so I will just serve you '/admin'".

To fix this issue, we must change the Nginx config file to something like this:

```
location ~* ^/admin {
 deny all;
}
```

Wow, so what's that? This checks, in a case-insensitive way (potentially important for Windows servers), for any path that starts with `/admin`, i.e. it blocks `/admin`, `/admin/blub`, `/admin\x85`, etc.

Sounds complex? Yeah, because it is. Path Normalization vulnerabilities are awesome. If this interests you, you may also wanna check out this research from Rafael da Costa Santos: https://rafa.hashnode.dev/exploiting-http-parsers-inconsistencies