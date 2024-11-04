// tests/server.test.js
jest.mock('axios');
const axios = require('axios');
const request = require('supertest');
const app = require('../server');

// Mock the axios.post method
axios.post.mockImplementation((url, data, config) => {
    return Promise.reject({
        response: {
            data: {
                status: 400,
                message: 'Parameter redirect_uri does not match registered URI',
            },
            status: 400,
            statusText: 'Bad Request',
        },
    });
});

describe('GET /auth/twitch/callback', () => {
    it('should return 400 if code is missing', async () => {
        const res = await request(app).get('/auth/twitch/callback');
        expect(res.status).toBe(400);
        expect(res.text).toBe('Code is required');
    });

    it('should return 500 if Twitch authentication fails', async () => {
        const res = await request(app).get('/auth/twitch/callback?code=invalid_code');
        expect(res.status).toBe(500);
        expect(res.text).toBe('Internal Server Error');
    });
});