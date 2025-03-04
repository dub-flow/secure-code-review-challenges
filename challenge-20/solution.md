# My Solution

The app in this challenge is vulnerable to Local File Inclusion via Path Traversal.

As a proof of concept, we can download the always world-readable `/etc/passwd` file via `<host>/files/download?filename=../../../../../../etc/passwd`.

To fix this, there are two main strategies:

- Strategy 1: Strict Validation

Ideally, you should split the `filename` variable into the actual name and the file extension. The name should be validated to be alphanumeric whereas the extension should be validated against a strict allow-list.

This would be the best solution here.

- Strategy 2: Canonical Path Check

Say you must allow all sorts of special characters in the file name and also want to allow all kinds of file extensions. In this more complex case, you can do what's called the "Canonical Path Check". 

In essence, you do something like this:

```java
File file = new File(fileBasePath + filename);  
String absolutePath = file.getCanonicalPath();  

if (!absolutePath.startsWith(fileBasePath)) {  
    // throw an exception and don't process the file  
}
```

So you first get the "canonical path" (i.e., the "actual" path). This normalizes `../`, and e.g. resolves `/var/www/uploads/../../../../../etc/passwd` to `/etc/passwd`. 

In our example, we only want users to access files within `/var/www/uploads` (which is our `fileBasePath` here). 

So how can we enforce it? We check if the canonicalized path still starts with our `fileBasePath`. If it does, this means that the user is trying to access a file within `/var/www/uploads` (which we allow). If it doesn't, it means a user is trying to do some naughtiness and access files higher up the filesystem than `/var/www/uploads` (in which case we throw an exception).
