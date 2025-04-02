# My Solution

The code in this challenge is vulnerable to Eval Injection. This means that we can execute arbitrary commands by injecting a payload like the following:

`{"data":"require('child_process').execSync('whoami').toString()"}`

To remediate the Eval Injection vulnerability, the recommendation is pretty simple: Don't use `eval()`.

I took a web application security class during my Bachelor's in... well, quite a while ago 😝. And I remember my professor saying "Eval is Evil". That sums it up quite well.

So how would I deal with the developers here if I was an Application Security Consultant? Well, easy, just ask them what exactly they are trying to achieve and then figure out how to do the same but without `eval()`.