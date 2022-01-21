import validator from 'validator';

export class ValidatorEmailAdapter {
  validate(email: string) {
    if (!email) return true;
    const emailIsValid = validator.isEmail(email);
    return emailIsValid;
  }
}
