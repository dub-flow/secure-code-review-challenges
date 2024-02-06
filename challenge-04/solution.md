# My Solution

- Clarify with the developers the use of the hardcoded credentials

- If they are just part of a login functionality, then the password should be hashed and stored in the database along the username

- If the app needs to know the cleartext password (e.g., say it is needed to authenticate against a downstream app), then I would recommend the developers do one of the following (sorted from best to still acceptable):

1️. Use language or platform-specific mechanisms, such as connection pools in Java

2️. Use an HSM

3️. Use a Key Vault

4️. Store the secret in an environment variable or a restricted config file (that is not part of version control)