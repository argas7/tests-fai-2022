import request from 'supertest';

import app from '../../src/app';

import connection from '../database.config';

import { mockCreateUserParams } from '../unit/entities/mocks';

describe('Integration test for crud of users', () => {
  beforeAll(async () => connection.create());

  beforeEach(async () => connection.clear());

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

  it('should list all users registered at database', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(0);
  });


  it('should create three users and then list all of them', async () => {
    const stUser = mockCreateUserParams(0);
    const ndUser = mockCreateUserParams(1);
    const rdUser = mockCreateUserParams(2);

    await request(app).post('/users').send(stUser);
    await request(app).post('/users').send(ndUser);
    await request(app).post('/users').send(rdUser);

    const response = await request(app).get('/users');

    expect(response.status).toEqual(200);
    expect(response.body).toHaveLength(3);
  });
});
