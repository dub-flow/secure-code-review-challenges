const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

// Dummy email transporter (configure properly for a real app)
const transporter = nodemailer.createTransport({
    service: 'example',
    auth: {
        user: 'user@example.com',
        pass: 'password'
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to our application!');
});

app.get('/profile', (req, res) => {
    // Dummy profile information
    res.json({ username: 'JohnDoe', email: 'john@example.com' });
});

app.post('/register', (req, res) => {
    // User registration logic (omitted for brevity)
    res.send('User registration successful!');
});

app.post('/reset-password', (req, res) => {
    const email = req.body.email;
    const host = req.headers.host;

    const resetLink = `http://${host}/reset-password?token=generatedToken123`;
    transporter.sendMail({
        from: 'support@example.com',
        to: email,
        subject: 'Password Reset',
        text: `Click here to reset your password: ${resetLink}`
    });

    res.send('Password reset link has been sent to your email.');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
