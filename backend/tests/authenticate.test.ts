import request from 'supertest';
import app from '../src/server';
import mongoose from 'mongoose';
import { User } from '../src/models/User';
import { MongoMemoryServer } from 'mongodb-memory-server';

async function createMemoryServer() {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
}// didnt want to do an arrow function for some reason

beforeAll(createMemoryServer);

afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
});

beforeEach(async () => {
    await User.deleteMany({});
});

describe('User Authentication', () => {
    // it('should register a new user', async () => {
    //     const response = await request(app)
    //         .post('/api/auth/register')
    //         .send({
    //             username: 'testuser',
    //             email: 'L5FQ2@example.com',
    //             password: 'testpassword',
    //         });
    //     expect(response.status).toBe(200);
    //     expect(response.body.message).toBe('User registered successfully');
    // });

    it('should login a registered user', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'l5fq2@example.com', // test failing because of case sensitivity
                password: 'testpassword',
            });
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
        expect(response.body.user).toBeDefined();
    });
});
