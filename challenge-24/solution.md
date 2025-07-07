# My Solution

So the app allows users to upload an XSLT file and then uses it to parse an XML file. The idea of this could be to allow users to transform the XML into any format they want.

Now, I'm by no means an XSLT expert, but the easiest way to exploit is by using some of XSLT's more powerful functionality, such as "unparsed-text", which allows reading arbitrary files from the file system (see `./exploit-read-file.xslt` for an example exploitation payload).

This one's a novum because I don't think there is a great way to make uploading arbitrary XSLT files secure. Other than "Don't do it", the best way to mitigate this vulnerability is as follows:

Sandbox the process running the XSLT transformation, and run it on a restricted container on a host in a separate network. 

The idea is: It's fundamentally a risky thing to allow users to provide XSLT files, so you just make sure it's as far away from the rest of your stuff as possible, just like you wouldn't light fireworks right next to your 1st edition Harry Potter books (thanks to @relaxnow for helping me with the remediation guidance and the metaphor 😃).