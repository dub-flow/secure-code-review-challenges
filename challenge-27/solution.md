# How to Hack it

The app in this challenge is vulnerable to an Integer Overflow. It's a small dummy shopping system that allows you to specify the number of items to buy.

If we run the app and say e.g. that we buy 15 items, the app works as intended. Since one item costs 1 euro (which is fixed in this app), we have to pay 15 euros for 15 items.

However, if we say that we want to buy 2147483648 items, the system all of a sudden says that we have to pay a negative amount, i.e. we're owed money.
 
Why's that? Because the max integer value is 2147483647 (i.e., our overflow payload minus 1). By providing a value larger than the max value, it wraps around and becomes the lowest possible value, i.e. -2147483648.

# My Solution

To remediate the Integer Overflow, you can e.g. implement boundary checks. 

The idea is simple:

If 2147483648 becomes -2147483648, then we can just check that the variable "quantity" is smaller than 2147483648. That covers the upper bound. 

Also, we wanna cover the lower bound. In this example, we can just check that "quantity" is greater than 0.

That way, we prevent both overflows and underflows.