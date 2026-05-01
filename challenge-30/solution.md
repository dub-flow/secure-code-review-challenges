# How to Hack

The app in this challenge is vulnerable to HTML Injection via a PDF renderer. The API blindly embeds the user-controlled `content` field into an HTML template that is then rendered by `wkhtmltopdf`.

A PDF renderer like this effectively behaves like a headless browser. If you give it HTML, it will render it just like a normal browser would, including loading external resources such as images, iframes, and scripts.

Since the API inserts our HTML directly into the document without any sanitization, we can inject arbitrary HTML. The most common way to exploit this is SSRF using things like iframes. The renderer will fetch those resources server-side (!) while generating the PDF.

A simple proof-of-concept renders an external page inside the generated PDF:

```json
{"content": "<iframe src=\"https://dub-flow.com\" width=\"800\" height=\"600\"></iframe>"}
```

In the real world, an attacker would typically try to embed sensitive data instead, for example from cloud metadata services (`http://169.254.169.254/latest/meta-data/`), so that it gets included in the generated PDF.

# How to Fix

The root problem is that user input is inserted directly into an HTML template and then rendered by `wkhtmltopdf`. Since the renderer behaves like a headless browser, any injected HTML (for example, iframes or images) will be processed server-side.

The main fix is to make sure user input is not treated as HTML in the first place. In our challenge, that simply means escaping the input before inserting it into the template:

```go
html.EscapeString(req.Content)
```

This ensures that anything a user submits is rendered as plain text instead of HTML, which prevents HTML injection.

On top of that, it is good practice to harden the PDF renderer itself. `wkhtmltopdf` supports features such as JavaScript execution and local file access, which can increase the attack surface. These should be disabled unless they are actually required:

```go
page.EnableLocalFileAccess.Set(false)
page.DisableJavascript.Set(true)
```

These settings reduce the impact of potential rendering issues and add some defense in depth if unsafe HTML ever makes it to the renderer again.
