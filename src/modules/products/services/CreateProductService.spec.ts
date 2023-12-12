import AppError from '@shared/errors/AppError';

import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';
import fakeUser from '@modules/users/repositories/fakes/seeds/fakeUser';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeProductsRepository: FakeProductsRepository;
let fakeUsersRepository: IUsersRepository;

let createProductService: CreateProductService;

describe('CreateProductService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeProductsRepository = new FakeProductsRepository();

    createProductService = new CreateProductService(fakeProductsRepository, fakeUsersRepository);
  });

  it('1. Should be able to create a new product', async () => {
    const product = await createProductService.execute({
      name: 'Arroz',
      active: true,
      userId: fakeUser.id
    });

    expect(product).toHaveProperty('id');
    expect(product.name).toBe('Arroz');
  });

  it('2. Should not be able to create product with same name', async () => {
    await fakeProductsRepository.create({ name: 'Soja' });

    await expect(
      createProductService.execute({
        name: 'Soja',
        active: true,
        userId: fakeUser.id
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('3. Should not be able to create with invalid user', async () => {
    await expect(
      createProductService.execute({
        name: 'Soja',
        active: true,
        userId: 'invalid'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
