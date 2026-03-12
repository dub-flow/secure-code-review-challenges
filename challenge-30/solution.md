# How to Hack

This challenge abuses the fact that the API blindly embeds user-controlled HTML into a PDF that is rendered by wkhtmltopdf.

A PDF renderer like this effectively behaves like a headless browser. If you give it HTML, it will render it just like a normal browser would - including loading external resources such as images, iframes, and scripts.

Since the API inserts our HTML directly into the document without any sanitization, we can inject arbitrary HTML.

The most common way to exploit this is SSRF using things like iframes. The renderer will fetch those resources server-side (!) while generating the PDF.

A simple example of how to exploit this is shown in `./exploit.req`. The request in the example is harmless - it simply renders my website inside the generated PDF. In the real world, an attacker would typically try to embed sensitive data instead, for example from cloud metadata services, so that it gets included in the generated PDF.

# How to Fix

The root problem is that user input is inserted directly into an HTML template and then rendered by wkhtmltopdf. Since the renderer behaves like a headless browser, any injected HTML (for example, iframes or images) will be processed server-side.

The main fix is to make sure user input is not treated as HTML in the first place. In our challenge, that simply means escaping the input before inserting it into the template:

𝐡𝐭𝐦𝐥.𝐄𝐬𝐜𝐚𝐩𝐞𝐒𝐭𝐫𝐢𝐧𝐠(𝐫𝐞𝐪.𝐂𝐨𝐧𝐭𝐞𝐧𝐭)

This ensures that anything a user submits is rendered as plain text instead of HTML, which prevents HTML injection.

On top of that, it is good practice to harden the PDF renderer itself. wkhtmltopdf supports features such as JavaScript execution and local file access, which can increase the attack surface. These should be disabled unless they are actually required.

For example:

𝐩𝐚𝐠𝐞.𝐄𝐧𝐚𝐛𝐥𝐞𝐋𝐨𝐜𝐚𝐥𝐅𝐢𝐥𝐞𝐀𝐜𝐜𝐞𝐬𝐬.𝐒𝐞𝐭(𝐟𝐚𝐥𝐬𝐞)
𝐩𝐚𝐠𝐞.𝐃𝐢𝐬𝐚𝐛𝐥𝐞𝐉𝐚𝐯𝐚𝐬𝐜𝐫𝐢𝐩𝐭.𝐒𝐞𝐭(𝐭𝐫𝐮𝐞)

These settings reduce the impact of potential rendering issues and add some defense in depth if unsafe HTML ever makes it to the renderer again.

For a full solution, check out `./safe.go`.