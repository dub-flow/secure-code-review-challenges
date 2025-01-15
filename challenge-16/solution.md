# My Solution

To exploit this vulnerability, we need to upload a webshell. Since `.jsp` is blocklisted for the file upload functionality, we can use a different web page format, such as `.jspx` (see `./shell.jspx`). Next, we can visit our webshell via `http://localhost/uploads/shell.jspx?cmd=id`. We have RCE!

The problem here is a lack of input validation on the file upload functionality. There is a variety of things that are important for file uploads, and I would suggest checking out this great OWASP Cheat Sheet for a comprehensive list: https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html

The most important ones that come to mind here are, in my opinion, as follows:

1. Never store uploaded files inside the web root 

2. Always use strict allow-lists for file extensions

3. Validate the file name, e.g. only allow alphanumeric characters (this would be one way to mitigate Path Traversal)

As said, there are many other important considerations. However, these are the most important when mitigating the concrete RCE vulnerability of this challenge.
