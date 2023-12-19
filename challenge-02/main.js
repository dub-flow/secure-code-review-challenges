const express = require('express');
const axios = require('axios');

const app = express();

app.get('/profile', (req, res) => {
    // Simulated profile data
    const profileData = {
        name: 'John Doe',
        role: 'Developer'
    };
    res.json(profileData);
});

app.get('/fetch-data', async (req, res) => {
    const url = req.query.url;
    try {
        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
