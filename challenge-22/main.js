const express = require('express');
const app = express();

// Imagine this to be a fully-grown database
const mockDb = {
    users: [
        { username: 'admin', password: 'admin123' },
        { username: 'user1', password: 'password1' },
    ],
};

app.use(express.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = mockDb.users.find(u => u.username === username && u.password === password);

    if (user) {
        res.send({ message: 'Login successful!' });
    } else {
        res.status(401).send({ error: 'Invalid credentials' });
    }
});

app.post('/process-data', (req, res) => {
    const { data } = req.body;

    try {
        const result = eval(data); 
        res.send({ result });
    } catch (err) {
        res.status(400).send({ error: 'Invalid data' });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
