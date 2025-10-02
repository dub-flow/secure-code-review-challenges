# My Solution

The app in this challenge is vulnerable to Server-side Template Injection (SSTI) via the `tmpl` parameter. 

It appears that the `html/template` package, used for templating in this challenge, does a pretty good job of preventing the easiest SSTI exploitations. However, there are several attack scenarios here, such as extracting values from the app or XSS.

As an example, we can extract the `/etc/passwd` file via `<host>?tmpl={{ReadUserFile "/etc/passwd"}}`. This leverages the `ReadUserFile` function defined in the app. The 'password' variable can be extracted via `<host>/?tmpl={{.Password}}`.

Moreover, we can get XSS via `<host>/?tmpl={{define "dub-flow"}}<​script>alert(1)<​/script>{{end}} {{template "dub-flow"}}`, where we basically add a new template called `dub-flow`.

To remediate the SSTI vulnerability, the first question one should ask is what is the developer trying to achieve here. Ultimately, they probably want to take some user data, put it into a template, and then render it to the user. 

For this, parsing the whole user input is not the way to go 😃. Instead, the developers should already define a template and only let the user control parts of it. 

For example: Say you want the user to provide their name and then give them a custom greeting. In this case, you can do something like this

<p>Hello {{.Name}}</p>

Where `.Name` comes from the user.