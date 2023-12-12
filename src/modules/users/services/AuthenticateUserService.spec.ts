import "reflect-metadata"

import AuthenticateUserService from './AuthenticateUserService';
import IHashProvider from '@shared/container/HashProvider/models/IHashProvider';
import FakeHashProvider from '@shared/container/HashProvider/fakes/FakeHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import fakeUser from '../repositories/fakes/seeds/fakeUser';

let fakeUsersRepository: IUsersRepository;
let authenticateUserService: AuthenticateUserService;
let hashProvider: IHashProvider;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    hashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();

    authenticateUserService = new AuthenticateUserService(fakeUsersRepository, hashProvider);
  });

  it('1. Should be able to create a new person.', async () => {
    // ? Assert
    const input = {
      name: "Thiago Watanabe",
      nationalDocument: '65254335092'
    }
    // ? Act
    const person = await authenticateUserService.execute({
      email: fakeUser.email,
      password: fakeUser.password
    });

    // ? Arrange
    expect(person).toHaveProperty('accessToken');
  });
});
