# My Solution

The code in this challenge is vulnerable to XXE, and can e.g. be exploited by sending a request like `./exploit.req`.

My remediation guidance follows the OWASP XXE Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/XML_External_Entity_Prevention_Cheat_Sheet.html. Check it out for concrete code samples.

How I would approach it:

- Clarify with the developers if they need doctypes at all
- If they don't, recommend that they disable doctypes entirely
- If they do, they should disable external entities and external doctypes

On top of this, there are some more flags which are recommended:

1. Explicitly disable XIncludes
2. Disable expansion for entity references
3. Enable Secure Processing

For a secure version of the code, please check out `./safe.java`.