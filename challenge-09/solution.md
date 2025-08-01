# My Solution

I created a walkthrough for this challenge: https://www.youtube.com/watch?v=JtE9HbLd8ro

The problem here is that the app implements authentication but no authorization. Consequently, any logged-in user can edit the profile of any other logged-in user, which is most likely unintended and a serious vulnerability.

To remediate this, implement a check ensuring users can only edit their own profile. This can be accomplished e.g. by taking the username from the session (not directly attacker-controlled) instead of the request (directly under the attacker's control). An example of how to make the app secure can be found in `./safe.py`.
