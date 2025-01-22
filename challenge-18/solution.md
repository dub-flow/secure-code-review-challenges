# My Solution

The code snippet in this challenge is vulnerable to Insecure Deserialization. To exploit this vulnerability, we serialize our own `User` object that has the role set to `admin` (see `./exploit.php`).

Next, we run this script via:`php exploit.php`

This outputs the following serialized object string: `O:4:"User":2:{s:8:"username";s:8:"username";s:4:"role";s:5:"admin";}`

We now input this string into the form, which makes us an admin!

The remediation guidance for developers is simple here: Don't deserialize objects from an untrusted location. Instead, use a safer serialization format, such as JSON or protobuf.