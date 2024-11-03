// tests/server.test.js
const request = require('supertest');
const app = require('../server');

describe('GET /auth/twitch/callback', () => {
    it('should return 400 if code is missing', async () => {
        const res = await request(app).get('/auth/twitch/callback');
        expect(res.status).toBe(400);
        expect(res.text).toBe('Code is required');
    });

    it('should return 500 if Twitch authentication fails', async () => {
        // Mock the axios post request to simulate failure
        jest.mock('axios');
        const axios = require('axios');
        axios.post.mockRejectedValue(new Error('Authentication failed'));

        const res = await request(app).get('/auth/twitch/callback?code=invalid_code');
        expect(res.status).toBe(500);
        expect(res.text).toBe('Internal Server Error');
    });
});