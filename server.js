// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const firebase = require('firebase/app');
require('firebase/database');

const app = express();

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to CollabCast API!');
});

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

    if (!code) {
        return res.status(400).send('Code is required');
    }

    try {
        const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
            params: {
                client_id: process.env.TWITCH_CLIENT_ID,
                client_secret: process.env.TWITCH_CLIENT_SECRET,
                code,
                grant_type: 'authorization_code',
                redirect_uri: `${process.env.BASE_URL}/auth/twitch/callback`
            }
        });

        const { access_token, refresh_token, expires_in } = response.data;
        // Handle tokens (e.g., store them in the database or session)
        res.send('Authentication successful');
    } catch (error) {
        console.error('Error during Twitch authentication:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Handle Poll Creation
app.post('/polls', (req, res) => {
    const { question, options } = req.body;
    const pollRef = firebase.database().ref('polls');
    const newPoll = {
        question,
        options,
        votes: {}
    };
    pollRef.push(newPoll);
    res.status(201).send('Poll created');
});

// Handle Notifications
app.post('/notifications', (req, res) => {
    const { message } = req.body;
    const notifRef = firebase.database().ref('notifications');
    notifRef.push({ message });
    res.status(201).send('Notification sent');
});

// Webhook for Twitch Events
app.post('/webhook/twitch', (req, res) => {
    const eventType = req.headers['twitch-eventsub-message-type'];

    if (eventType === 'notification') {
        const notification = req.body;
        // Handle your event (like viewer join/leave)
        handleEvent(notification);
    }
    res.status(204).send();
});

function handleEvent(notification) {
    const notifRef = firebase.database().ref('notifications');
    notifRef.push({ message: notification.message });
}

module.exports = app;
