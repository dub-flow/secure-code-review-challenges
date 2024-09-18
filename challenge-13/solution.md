# My Solution

So the crux of this SQL Injection example is that things like `order by`, table names, column names, `group by`, etc., cannot be parameterized. This means we have to provide some manual validation. 

For an `ORDER BY <untrusted>`, I would recommend the following strategies:

1. Ideally, instead of allowing the user to specify the column name, let them provide the column index. This means you can simply parse the untrusted input to an integer, and all is easy.

2. If that is not possible, provide a strict allow-list where you validate the untrusted input against a list of valid column names.