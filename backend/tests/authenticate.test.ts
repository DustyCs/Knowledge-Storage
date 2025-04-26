
// Test user registration and login functionality

import request from 'supertest';
import app from '../src/server';
import { User } from '../src/models/User';

describe('User Authentication', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: 'L5FQ2@example.com',
                password: 'testpassword',
            });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User registered successfully');
    });

    it('should login a registered user', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'L5FQ2@example.com',
                password: 'testpassword',
            });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
        expect(response.body.user).toBeDefined();
    });
});
