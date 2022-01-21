import { getRepository } from 'typeorm';
import { UserRepository } from '@/data/repositories';
import { UserUsecase } from '@/data/usecases';
import { User } from '@/db/models';

export class TypeORMUserRepository implements UserRepository {
  constructor() {}

  async create(createParams: UserUsecase.createParams) {
    const userRepository = getRepository(User);
    const user = await userRepository.save({
      ...createParams,
    });

    return user;
  }

  async list() {
    const userRepository = getRepository(User);
    const users = await userRepository.find({});
    console.log(users);

    return users;
  }

  async update(updateParams: UserUsecase.updateParams) {
    const { id, ...otherParams } = updateParams;

    console.log(otherParams);

    const propertiesToUpdate = Object
      .entries(otherParams)
      .filter(([key, value]) => value)
      .reduce((acc, curr) => {
        return { ...acc, [curr[0]]: curr[1] }
      }, {} as Record<string, any>)

    console.log(propertiesToUpdate);

    const userRepository = getRepository(User);
    await userRepository.update(
      updateParams.id,
      propertiesToUpdate,
    );
    const userUpdated = await userRepository.findOne({
      where: { id },
    });

    return userUpdated;
  }

  async delete(deleteParams: UserRepository.deleteParams) {
    const userRepository = getRepository(User);
    await userRepository.delete(deleteParams.id);
  }
}
