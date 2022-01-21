import { UserUsecase } from '../../../../src/data/usecases';

const possibleEmails = [
  'some_email@gmail.com',
  'some_email@yahoo.com.br',
  'some_email@outlook.com',
  'some_email@citi.org.br',
  'some_email@loomi.com.br',
]

export const mockCreateUserParams = (emailIndex: number): UserUsecase.createParams => ({
  name: 'Fake name',
  age: 20,
  email: possibleEmails[emailIndex],
  password: 'some-password'
});

export const mockUpdateUser = (): UserUsecase.updateParams => ({
  id: 'fde2c69b-a09b-4d69-9a45-e8c13992253a',
  name: 'This is my new name',
  email: 'this_is_my_new@email',
});
