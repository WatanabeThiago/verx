import { injectable, inject } from 'tsyringe';
import IPropertiesRepository from '../repositories/IPropertiesRepository';
import Property from '../infra/typeorm/entities/Property';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowPropertyService {
  constructor(
    @inject('PropertiesRepository')
    private propertiesRepository: IPropertiesRepository,
  ) { }

  public async execute(propertyId: string): Promise<Property> {
    const property = await this.propertiesRepository.findById(propertyId);
    if (!property) {
      throw new AppError('Propriedade não encontrada.', 404);
    }

    return property;
  }
}

export default ShowPropertyService;
