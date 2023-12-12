import { Repository } from 'typeorm';

import IPropertiesRepository from '../../../repositories/IPropertiesRepository';
import CreatePropertyDTO from '../../../dtos/CreatePropertyDTO';

import Property from '../entities/Property';
import AppDataSource from '@shared/infra/typeorm';
import IIndexPropertiesDTO from '@modules/properties/dtos/IIndexPropertiesDTO';
import cleanEmptyFields from '@shared/functions/cleanEmptyFields';

class PropertiesRepository implements IPropertiesRepository {
  private ormRepository: Repository<Property>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Property);
  }

  public async index(): Promise<Property[]> {
    const properties = await this.ormRepository.find({
      order: { name: 'ASC' },
      relations: ['products', 'products.product', 'person']
    });
    return properties;
  }

  public async filter(where: IIndexPropertiesDTO): Promise<Property[]> {
    console.log(cleanEmptyFields({
      person: {
        nationalDocument: where.person.nationalDocument
      },
      products: {
        productId: where.products.productId
      },
      city: where.city,
      state: where.state,
      country: where.country,
    }))
    const properties = await this.ormRepository.find({
      order: { name: 'ASC' },
      where: cleanEmptyFields({
        person: {
          nationalDocument: where.person.nationalDocument
        },
        products: {
          productId: where.products.productId
        },
        city: where.city,
        state: where.state,
        country: where.country,
      }),
      relations: ['products', 'products.product', 'person']
    });
    return properties;
  }

  public async findById(id: string): Promise<Property | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user || undefined;
  }

  public async findByName(name: string): Promise<Property | undefined> {
    const user = await this.ormRepository.findOne({
      where: { name },
    });

    return user || undefined;
  }

  public create(data: CreatePropertyDTO): Property {
    const properties = this.ormRepository.create(data);
    return properties;
  }

  public async save(data: Property): Promise<Property> {
    return this.ormRepository.save(data);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default PropertiesRepository;
