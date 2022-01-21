import validator from 'validator';

import { ValidatorEmailAdapter } from '../../src/infra/validators';

const makeSut = () => {
  const sut = new ValidatorEmailAdapter();

  return {
    sut,
  };
};

describe('Validator Email Adapter', () => {
  test('Should call validator with correct value', () => {
    const { sut } = makeSut();
    const validatorEmailSpy = jest.spyOn(validator, 'isEmail');

    const fakeEmail = 'valid_email@email.com';

    sut.validate(fakeEmail);
    expect(validatorEmailSpy).toHaveBeenCalledWith(fakeEmail);
  });

  test('Should return false if email is invalid', () => {
    const { sut } = makeSut();

    const fakeEmail = 'invalid_email.com';

    const response = sut.validate(fakeEmail);
    expect(response).toBe(false);
  });

  test('Should return true on success', () => {
    const { sut } = makeSut();

    const fakeEmail = 'valid_email@email.com';

    const response = sut.validate(fakeEmail);
    expect(response).toBe(true);
  });
});
