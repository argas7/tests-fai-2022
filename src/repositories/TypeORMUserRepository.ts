import { UserRepository } from '@/data/repositories';
import { UserUsecase } from '@/data/usecases';
import { TypeormHelper } from '@/db/config';
import { User } from '@/db/models';

export class TypeORMUserRepository implements UserRepository {
  async create(createParams: UserUsecase.createParams) {
    const user = await TypeormHelper.connection.getRepository(User).save({
      ...createParams,
    });

    return user;
  }

  async list() {
    const users = await TypeormHelper.connection.getRepository(User).find({});
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

    await TypeormHelper.connection.getRepository(User).update(
      updateParams.id,
      propertiesToUpdate,
    );
    const userUpdated = await TypeormHelper.connection.getRepository(User).findOne({
      where: { id },
    });

    return userUpdated;
  }

  delete() {
    console.log('bye bye');
  }
}
