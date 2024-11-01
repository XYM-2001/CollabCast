require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Step 2a: Redirect to Twitch for Authentication
app.get('/auth/twitch', (req, res) => {
    const redirectUri = encodeURIComponent(`${process.env.BASE_URL}/auth/twitch/callback`);
    const clientId = process.env.TWITCH_CLIENT_ID;
    const scope = 'chat:read chat:edit user:read:email';
    res.redirect(`https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`);
});

// Step 2b: Handle Twitch Callback
app.get('/auth/twitch/callback', async (req, res) => {
    const { code } = req.query;

    try {
        const response = await axios.post(`https://id.twitch.tv/oauth2/token`, null, {
            params: {
                client_id: process.env.TWITCH_CLIENT_ID,
                client_secret: process.env.TWITCH_CLIENT_SECRET,
                code,
                grant_type: 'authorization_code',
                redirect_uri: `${process.env.BASE_URL}/auth/twitch/callback`,
            },
        });

        const { access_token } = response.data;
        // Store access_token securely (e.g., in your database)
        res.json({ access_token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Authentication failed');
    }
});

app.get('/api/user', async (req, res) => {
    const accessToken = 'stored_access_token'; // Retrieve from your storage

    try {
        const response = await axios.get('https://api.twitch.tv/helix/users', {
            headers: {
                'Client-ID': process.env.TWITCH_CLIENT_ID,
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching user data');
    }
});

app.post('/webhook/twitch', (req, res) => {
    // Validate signature here
    const eventType = req.headers['twitch-eventsub-message-type'];

    if (eventType === 'notification') {
        const notification = req.body;
        // Handle your event (like viewer join/leave)
        handleEvent(notification);
    }
    res.status(204).send();
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
