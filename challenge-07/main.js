const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Dummy email transporter (imagine this to be proper email transporter)
const transporter = { 
    sendMail: (mailOptions) => {
        console.log('[MOCK] Sending email with options:', mailOptions);
    }
};

app.get('/profile', (req, res) => {
    // Dummy profile information (omitted for brevity)
    res.json({ username: 'JohnDoe', email: 'john@example.com' }); 
});

app.post('/register', (req, res) => {
    // User registration logic (omitted for brevity)
    res.send('User registration successful!'); 
});

app.post('/reset-password', (req, res) => {
    const resetLink = `http://${req.headers.host}/reset-password?token=generatedToken123`;
    transporter.sendMail({
        from: 'support@example.com',
        to: req.body.email,
        subject: 'Password Reset',
        text: `Click here to reset your password: ${resetLink}`
    });

    res.send('Password reset link has been sent to your email.');
});

app.listen(3000, () => console.log('Server is running on port 3000'));
