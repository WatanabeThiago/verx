import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakePersonsRepository from '../repositories/fakes/FakePersonsRepository';
import IIdGeneratorProvider from '@shared/container/IdGeneratorProvider/models/IIdGeneratorProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IPersonsRepository from '../repositories/IPersonsRepository';
import FakeIdGeneratorProvider from '@shared/container/IdGeneratorProvider/fakes/FakeIdGeneratorProvider';
import IHashProvider from '@shared/container/HashProvider/models/IHashProvider';
import FakeHashProvider from '@shared/container/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: IUsersRepository;
let fakePersonsRepository: IPersonsRepository;
let idGeneratorProvider: IIdGeneratorProvider;
let hashProvider: IHashProvider;

let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    idGeneratorProvider = new FakeIdGeneratorProvider();
    hashProvider = new FakeHashProvider();
    fakePersonsRepository = new FakePersonsRepository();

    createUserService = new CreateUserService(fakeUsersRepository, fakePersonsRepository, idGeneratorProvider, hashProvider);
  });

  it('1. Should be able to create a new user.', async () => {
    // ? Assert
    const input = {
      email: 'newemail4@gmail.com',
      name: "Thiago Watanabe",
      password: '12345678'
    }
    // ? Act
    const person = await createUserService.execute(input);

    // ? Arrange
    expect(person).toHaveProperty('id');
    expect(person.name).toBe(input.name);
    expect(person.user.email).toBe(input.email);
  });

  it('2. Should not be able to create user with duplicated email', async () => {
    // ? Assert
    const input = {
      email: 'duplicated4@gmail.com',
      name: "Thiago Watanabe",
      password: '12345678'
    }

    await createUserService.execute(input);

    // ? Act

    // ? Arrange
    await expect(
      createUserService.execute(input),
    ).rejects.toBeInstanceOf(AppError);
  });
});
