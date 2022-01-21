import { UserRepository } from '@/data/repositories';
import { UserUsecase } from '@/data/usecases';

export class UserService implements UserUsecase {
  constructor(private userRepository: UserRepository) {}

  async create(createParams: UserUsecase.createParams) {
    const user = await this.userRepository.create(createParams);
    return user;
  }

  async list() {
    return this.userRepository.list();
  }

  update(updateParams: UserUsecase.updateParams) {
    return this.userRepository.update(updateParams);
  }

  delete(deleteParams: UserUsecase.deleteParams) {
    return this.userRepository.delete(deleteParams);
  }
}
