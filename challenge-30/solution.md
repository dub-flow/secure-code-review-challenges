# How to Hack

This challenge abuses the fact that the API blindly embeds user-controlled HTML into a PDF that is rendered by wkhtmltopdf.

A PDF renderer like this effectively behaves like a headless browser. If you give it HTML, it will render it just like a normal browser would - including loading external resources such as images, iframes, and scripts.

Since the API inserts our HTML directly into the document without any sanitization, we can inject arbitrary HTML.

The most common way to exploit this is SSRF using things like iframes. The renderer will fetch those resources server-side (!) while generating the PDF.

A simple example of how to exploit this is shown in `./exploit.req`. The request in the example is harmless - it simply renders my website inside the generated PDF. In the real world, an attacker would typically try to embed sensitive data instead, for example from cloud metadata services, so that it gets included in the generated PDF.

# How to Fix

<TBD>