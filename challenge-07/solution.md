# My Solution

- Tell the developers to never trust the host header as it's attacker-controlled
- Recommend they hardcode the host
- If that's not possible (e.g. because the app is deployed to multiple environments on different hosts), then they should do e.g. one of the following:

1. Validate the host header against an allow-list of trusted hosts
2. Use an environment variable for the host and provide the appropriate value at runtime (this could e.g. be part of their CI/CD)
