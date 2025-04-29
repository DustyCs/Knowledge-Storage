import request from 'supertest';
import app from '../../src/server';

beforeAll

describe('Post CRUD', () => {
    it('should create a new post', async() => {
        const response = await request(app)
            .post('/api/post/create')
            .send({
                title: 'Test Post',
                content: 'This is a test post',
                tags: ['Unit Test', 'Jest'],
            });
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Test Post');
        expect(response.body.content).toBe('This is a test post');
        expect(response.body.tags).toEqual(['Unit Test', 'Jest']);
    });

    it('should get the new post', async () => {
        const response = await request(app)
            .get('/api/post')
            .send();
        expect(response.status).toBe(200);
    })

    it('should edit the new post', async () => {
        const response = await request(app)
            .put('/api/post/update/')
            .send({
                title: 'Updated Test Post',
                content: 'This is an updated test post',
                tags: ['Unit Test', 'Jest'],
            });
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Updated Test Post');
        expect(response.body.content).toBe('This is an updated test post');
        expect(response.body.tags).toEqual(['Unit Test', 'Jest']);
    })

    it('should delete the new post', async () => {
        const response = await request(app)
            .delete('/api/post/delete/')
            .send();
        
        expect(response.status).toBe(200);
    })

})