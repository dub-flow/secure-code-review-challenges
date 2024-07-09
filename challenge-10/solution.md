# My Solution

The problem here is that the JWT signature is not verified which means that one can alter the claims of their JWT and e.g. change the username from 'bob' to 'admin'.

To remediate this, verify the JWT signature and reject tokens that cannot be verified.