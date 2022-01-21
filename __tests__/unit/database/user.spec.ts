import { User } from '../../../src/db/models';
import { TypeORMUserRepository } from '../../../src/repositories';

import { mockCreateUserParams, mockUpdateUser } from '../entities/mocks';

import connection from '../../database.config';

// System Under Test
const makeSut = () => {
  const userRepository = new TypeORMUserRepository();

  return {
    userRepository,
  };
};

describe('Tests for user repository implemented with postgres typeorm based', () => {
  beforeAll(async () => connection.create());

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  beforeEach(async () => connection.clear());

  test('Should create an user', async () => {
    const { userRepository } = makeSut();

    const fakeUser = mockCreateUserParams(0);
    const userCreated = await userRepository.create(fakeUser);

    expect(userCreated.id).toBeTruthy();
    expect(userCreated).toHaveProperty('name', fakeUser.name);
    expect(userCreated).toHaveProperty('email', fakeUser.email);
    expect(userCreated).toHaveProperty('age', fakeUser.age);
  });

  test('Should delete an user by his id', async () => {
    const { userRepository } = makeSut();

    const fakeUser = mockCreateUserParams(0);
    const userCreated = await userRepository.create(fakeUser);

    await userRepository.delete({ id: userCreated.id });

    const questionAlternativesNumber = await (await connection.getInstance())
      .createQueryBuilder()
      .addFrom(User, 'User')
      .getCount();

    expect(questionAlternativesNumber).toBe(0);
  });

  test('Should list all users if nothing is passed', async () => {
    const { userRepository } = makeSut();

    const fakeUser1 = mockCreateUserParams(0);
    const fakeUser2 = mockCreateUserParams(1);
    const fakeUser3 = mockCreateUserParams(2);
    const fakeUser4 = mockCreateUserParams(3);
    const fakeUser5 = mockCreateUserParams(4);

    const userCreated1 = await userRepository.create(fakeUser1);
    const userCreated2 = await userRepository.create(fakeUser2);
    const userCreated3 = await userRepository.create(fakeUser3);
    const userCreated4 = await userRepository.create(fakeUser4);
    const userCreated5 = await userRepository.create(fakeUser5);

    const users = await userRepository.list();

    expect(users).toHaveLength(5);
    expect(users[0]).toHaveProperty('id', userCreated1.id);
    expect(users[1]).toHaveProperty('id', userCreated2.id);
    expect(users[2]).toHaveProperty('id', userCreated3.id);
    expect(users[3]).toHaveProperty('id', userCreated4.id);
    expect(users[4]).toHaveProperty('id', userCreated5.id);
  });


  test('Should update an user', async () => {
    const { userRepository } = makeSut();

    const fakeUser = mockCreateUserParams(0);
    const createdUser = await userRepository.create(fakeUser);

    const valuesToUpdate = mockUpdateUser();

    const userUpdated = await userRepository.update({
      id: createdUser.id,
      name: valuesToUpdate.name,
      email: valuesToUpdate.email,
    });

    expect(userUpdated).toHaveProperty('name', valuesToUpdate.name);
    expect(userUpdated).toHaveProperty('email', valuesToUpdate.email);
  });
});
