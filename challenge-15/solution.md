# My Solution

This challenge is vulnerable to HTTP Response Splitting. This can be exploited by sending a request like this: `GET /payment/%0d%0aResponse:%20Splitted` (notice that the response contains a new header due to the injected newline characters). 

To make the Nginx configuration safe, please refer to `./safe-nginx.conf`.
