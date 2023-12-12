import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  name: string;
  active: boolean;
  userId: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({
    name,
    userId
  }: IRequest): Promise<Product> {
    const checkNameExits = await this.productsRepository.findByName(name);

    if (checkNameExits) {
      throw new AppError(
        'Produto com o mesmo nome já cadastrado no sistema',
        409,
      );
    }

    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const product = await this.productsRepository.create({ name });
    await this.productsRepository.save(product)


    return product;
  }
}

export default CreateProductService;
