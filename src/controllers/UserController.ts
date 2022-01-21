import { UserService } from '@/services';

export class UserController {
  constructor(private userService: UserService) {}

  async create(req, res) {
    const { name, email, password, age } = req.body;

    const createdUser = await this.userService.create({ name, email, password, age });

    res.send(createdUser);
  }

  async list(req, res) {
    const users = await this.userService.list();

    res.send(users);
  }

  async update(req, res) {
    const { id } = req.params;
    const { name, email, password, age } = req.body;

    const updatedUser = await this.userService.update({ id, name, email, password, age });

    res.send(updatedUser);
  }

  async delete(req, res) {
    const { id } = req.params;

    await this.userService.delete({ id });

    res.send('DELETED');
  }
}
