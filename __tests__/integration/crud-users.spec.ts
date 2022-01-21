import request from 'supertest';

import app from '../../src/app';

import connection from '../database.config';

describe('Integration test for crud of users', () => {
  beforeAll(async () => connection.create());

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  it('should create a user at database', async () => {
    const createUserParams = {
      name: 'alyson',
      email: 'alyson@email.com',
      password: '12345',
      age: 22,
    };

    const response = await request(app).post('/users').send(createUserParams);

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body.id).toBeTruthy();
    expect(response.body).toHaveProperty('name', createUserParams.name);
    expect(response.body).toHaveProperty('email', createUserParams.email);
    expect(response.body).toHaveProperty('password', createUserParams.password);
    expect(response.body).toHaveProperty('age', createUserParams.age);
  });
});
