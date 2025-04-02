# My Solution

The app in this challenge is vulnerable to Unsafe Reflection. The `user` variable is passed into `Class.forName(user);` without any validation, which allows an attacker to instantiate other classes.

To hack this, we instantiate a class of type `AdminUser` instead of the default of `NormalUser`.

To remediate the Unsafe Reflection vulnerability, I would recommend validating the `user` variable against a strict allow-list of classes that you want to be instantiated here (see `./SafeController.java` for an example)