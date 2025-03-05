const express = require('express');
const session = require('express-session');
const app = express();

// Imagine this to be a fully-grown database
const users_db = {
    "admin": {
        "password": "password",
        "api_key": "API-KEY-1234567890-SECRET",
    }
};

app.use(express.urlencoded({ extended: true }));
// Imagine this to be a secret loaded from a secure secret store
app.use(session({ secret: 'supersecretkey'}));

app.get("/login", (req, res) => {
    res.send(`<h1>Login</h1>
        <form method='POST'>
            <label>Username:</label> <input type='text' name='username'><br>
            <label>Password:</label> <input type='password' name='password'><br>
            <button type='submit'>Login</button>
        </form>
    `);
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (users_db[username] && users_db[username].password === password) {
        req.session.user = username;
        return res.redirect('/dashboard');
    }

    return res.send("Invalid credentials! <a href='/login'>Try again</a>");
});

app.get("/dashboard", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    res.send(`<p>Public statistics:</p>
        <ul>
            <li>Users online: 42</li>
            <li>Posts today: 18</li>
        </ul>
        <a href='/profile'>View Profile</a> | <a href='/logout'>Logout</a>
    `);
});

app.get("/profile*", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/login");
    }

    const user = req.session.user;
    const api_key = users_db[user].api_key;

    res.send(`${user} - API Key: ${api_key}`);
});

app.listen(5000, () =>  console.log('Server running on http://localhost:5000'));