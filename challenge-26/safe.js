const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

// Assume that this is a fully-grown database
let users = {
    guest: { password: "guest", profile: "My cool profile" }
};

function safeMerge(target, source) {
    for (let key in source) {
        if (key !== "__proto__" && key !== "constructor" && key !== "prototype") {
            target[key] = source[key]; 
        }
    }
}

// Mock login function - just sets a cookie for "guest" (imagine this to be a fully-grown login functionality)
app.post("/guest-login", (req, res) => {
    res.cookie("username", "guest", { httpOnly: true });
    res.json({ message: "Logged in as guest!" });
});

app.post("/update-profile", (req, res) => {
    let username = req.cookies.username;
    if (!username || !users[username]) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    let user = users[username];
    safeMerge(user, req.body);

    res.json({ message: "Profile updated", user });
});

app.get("/admin", (req, res) => {
    let user = users[req.cookies.username];
    if (user && user.isAdmin) {
        return res.send("Welcome, Admin!");
    }
    res.status(403).send("Access Denied");
});

app.listen(3000, () => console.log("Server running on port 3000"));
