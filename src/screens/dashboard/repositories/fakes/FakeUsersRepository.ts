import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';

import IUsersRepository from '../IUsersRepository';
import fakeUser from './seeds/fakeUser';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [
    fakeUser
  ];

  public async index(): Promise<User[]> {
    return this.users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const users = this.users.find(item => item.id === id);

    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const users = this.users.find(item => item.email === email);

    return users;
  }

  public create(data: ICreateUserDTO): User {
    const users = new User();

    Object.assign(users, data);

    this.users.push(users);

    return users;
  }

  public async save(users: User): Promise<User> {
    this.users.push(users);
    return users;
  }

  public async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex(item => item.id === id);

    this.users.splice(userIndex, 1);
  }
}

export default FakeUsersRepository;
