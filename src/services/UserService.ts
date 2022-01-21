import { UserRepository } from '@/data/repositories';
import { UserUsecase } from '@/data/usecases';

export class UserService implements UserUsecase {
  constructor(private userRepository: UserRepository) {}

  async create(createParams: UserUsecase.createParams) {
    const user = await this.userRepository.create(createParams);
    return user;
  }

  async list() {
    return await this.userRepository.list();
  }

  async update(updateParams: UserUsecase.updateParams) {
    return await this.userRepository.update(updateParams);
  }

  async delete(deleteParams: UserUsecase.deleteParams) {
    return await this.userRepository.delete(deleteParams);
  }
}
