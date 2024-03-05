const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

const secretKey = process.env.JWT_SECRET;;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const decoded = jwt.decode(token, { complete: true });
  req.decoded = decoded.payload;

  next();
};

app.get('/admin', verifyToken, (req, res) => {
  const { username } = req.decoded;
  if (username === 'admin') {
    // admin functionality is now available to the user

    return res.status(200).json({ message: 'Admin access granted' });
  }
  res.status(403).json({ message: 'Unauthorized access' });
});

app.get('/generate-token', (req, res) => {
  const payload = { username: 'user' };
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  res.status(200).json({ token });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
