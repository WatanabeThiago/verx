import AppError from '@shared/errors/AppError';

import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import DeleteProductService from './DeleteProductService';

let fakeProductsRepository: FakeProductsRepository;

let deleteProductService: DeleteProductService;

describe('DeleteProductService', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();

    deleteProductService = new DeleteProductService(fakeProductsRepository);
  });

  it('1. Should be able to delete a breed', async () => {
    const product = await fakeProductsRepository.create({
      name: 'RepFy',
    });

    const deleteSpy = jest.spyOn(fakeProductsRepository, 'delete');

    await deleteProductService.execute({ id: product.id });

    expect(deleteSpy).toBeCalledWith(product.id);
  });

  it('2. Should not be able to delete a invalid product', async () => {
    await expect(deleteProductService.execute({ id: 999 })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
