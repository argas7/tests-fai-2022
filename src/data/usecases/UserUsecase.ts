import { User } from '../entities';

export interface UserUsecase {
  create(params: UserUsecase.createParams): Promise<User>;
  list(): Promise<User[]>;
  update(params: UserUsecase.updateParams): Promise<User>;
  delete(params: UserUsecase.deleteParams): void;
}

export namespace UserUsecase {
  export type createParams = Omit<User, 'id'>;

  export type listParams = null;

  export type updateParams = {
    id: User['id'];

    name?: User['name'];
    age?: User['age'];
    email?: User['email'];
    password?: User['password'];
  };

  export type deleteParams = {
    id: string;
  };
}
