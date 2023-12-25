const express = require('express');
const axios = require('axios');

const app = express();

app.get('/profile', (req, res) => {
    console.log('Received request for /profile');

    // Simulated profile data
    const profileData = {
        name: 'John Doe',
        role: 'Developer'
    };
    
    res.json(profileData);
    console.log('Sent profile data response');
});

app.get('/fetch-data', async (req, res) => {
    const url = req.query.url;
    console.log(`Received request for /fetch-data with URL: ${url}`);
    
    try {
        const response = await axios.get(url);
        res.send(response.data);
        console.log(`Data fetched and sent for URL: ${url}`);
    } catch (error) {
        console.error(`Error fetching data from URL: ${url}`, error);
        res.status(500).send('Error fetching data');
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
