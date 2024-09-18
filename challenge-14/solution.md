# My Solution

So say that Bob has 1000 euros... What he can then do is send like 20 requests at the same time that send 200 euros to Alice. Note that in our scenario, Bob is not allowed to overspend, but the Race Condition allows him to bypass this condition.

Due to the Race Condition, there is a small window between the time where Bob's current balance is checked, and the actual transaction takes place. 

The easiest way to mitigate this vulnerability might be database transactions. The idea of a transaction is that a sequence of operations is treated as a single unit. So if we go away from hacking for a moment, database transactions make a lot of sense in our scenario anyway. Say that while Bob transfers money to Alice, the server crashes. This might leave the database in a state where the money has been deducted from Bob's balance already but hasn't reached Alice yet. That would be bad for poor Bob 😃, and transactions prevent this.

Database transactions are also a good mitigation against race conditions by using isolation levels to ensure that concurrent transactions do not interfere with each other, maintaining consistent data states.
