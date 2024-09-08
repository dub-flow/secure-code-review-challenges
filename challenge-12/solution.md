# My Solution

The problem here is that the Bash script compares the strings using unquoted variables. If you do something like this:

`𝐢𝐟 [[ $𝐒𝐄𝐂𝐔𝐑𝐄_𝐏𝐀𝐒𝐒𝐖𝐎𝐑𝐃 == $𝐢𝐧𝐩𝐮𝐭 ]];`

Then simply providing a `*` as input evaluates to true and you can bypass the password check without knowing the actual password.

This works because, in Bash-land, unquoted strings treat the * as a wildcard character.

To make things worse, this allows extracting the password, because `S*` would also give `Login Successful`, as would `Su*`, and so on. Thus, character by character you can leak the admin password out. 🙂 

To fix the issue, the variables need to be quoted:

`𝐢𝐟 [[ "$𝐒𝐄𝐂𝐔𝐑𝐄_𝐏𝐀𝐒𝐒𝐖𝐎𝐑𝐃" == "$𝟏" ]];`

Now, this bypass no longer works.