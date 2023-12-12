import IProductsRepository from '../IProductsRepository';
import ICreateProductDTO from '../../dtos/ICreateProductDTO';

import Product from '../../infra/typeorm/entities/Product';
import { fakeAlgodao, fakeCoffee, fakeMilho, fakeSoja, fakeSugarCane } from './seeds/fakeProducts';

class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [
    fakeAlgodao,
    fakeCoffee,
    fakeMilho,
    fakeSoja,
    fakeSugarCane
  ];

  public async index(): Promise<Product[]> {
    return this.products;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const error = this.products.find(item => item.name === name);

    return error;
  }

  public async findById(id: number): Promise<Product | undefined> {
    const error = this.products.find(item => item.id === id);

    return error;
  }

  public async create({ name }: ICreateProductDTO): Promise<Product> {
    const error = new Product();

    Object.assign(error, { id: this.products.length + 1, name });

    this.products.push(error);

    return error;
  }

  public async save(error: Product): Promise<Product> {
    this.products.push(error);
    return error;
  }

  public async delete(id: number): Promise<void> {
    const userIndex = this.products.findIndex(item => item.id === id);

    this.products.splice(userIndex, 1);
  }
}

export default FakeProductsRepository;
