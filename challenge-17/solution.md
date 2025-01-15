# My Solution

The code snippet in this challenge is vulnerable to OS Command Injection. There are several strategies to deal with this, such as:

1. Avoid executing OS commands altogether and use a ping library instead. Using existing libraries is always the preferable solution.

2. If you must run raw OS commands, don't invoke a shell, i.e. do not run 'sh -c ping' but run the 'ping' binary directly. Also, provide strict input validation on all dynamic parts of an OS command (which can be rather tricky with the input of a ping functionality!).

3. Make sure that the app runs with as limited privileges as possible (always a good idea but especially if you're running raw OS commands with user-supplied input!).