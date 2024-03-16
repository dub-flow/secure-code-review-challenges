# My Solution

- Recommend the developers to apply context-appropriate encoding, i.e. HTML-encode the `name` (e.g. this function looks reasonable: https://pkg.go.dev/html#EscapeString).

- If the developers want to allow HTML tags, e.g. styling in the name (say using red letters or bold fonts for the name), then HTML-encoding would break that.

This is actually not an easy problem to solve, and I wrote about one possible solution here: https://community.veracode.com/s/question/0D53n00007lkW9HCAU/cwe-80-how-to-fix-the-vulnerability-in-append-or-html-in-javascriptjquery (see the first reply by me)

In a nutshell 🥜:

- Don't allow users to provide HTML; separate the user input from the HTML output
- Instead of allowing users to input HTML directly, they should provide options for styling features they want
- Say, the developers want to allow 4 colors for the name (red, blue, green, black), then the API endpoint could accept a parameter such as `color` with values like 'red', 'blue', 'green', or 'black', and then render the appropriate styling based on the provided parameter.
