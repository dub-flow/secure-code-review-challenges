# My Solution

I created a walkthrough for this challenge: https://www.youtube.com/watch?v=2Q2gIkKMwhQ.

The code in this app is vulnerable to Host Header Injection. This may allow an attacker to craft malicious password reset links pointing to attacker-controlled domains, which could lead to phishing, credential theft, or session hijacking if a victim clicks on the link. An example of how to exploit this can be found in `./exploit.req`.

To remediate this vulnerability, I would:

- Tell the developers to never trust the host header as it's attacker-controlled
- Recommend they hardcode the host
- If that's not possible (e.g. because the app is deployed to multiple environments on different hosts), then they should do e.g. one of the following:

1. Validate the host header against an allow-list of trusted hosts
2. Use an environment variable for the host and provide the appropriate value at runtime (this could e.g. be part of their CI/CD)
