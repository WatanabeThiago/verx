import { injectable, inject } from 'tsyringe';
import IPropertiesRepository from '../repositories/IPropertiesRepository';
import Property from '../infra/typeorm/entities/Property';
import IIndexPropertiesDTO from '../dtos/IIndexPropertiesDTO';

@injectable()
class IndexPropertiesService {
  constructor(
    @inject('PropertiesRepository')
    private propertiesRepository: IPropertiesRepository,
  ) { }

  public async execute(data: IIndexPropertiesDTO): Promise<Property[]> {
    const properties = await this.propertiesRepository.filter(data);

    return properties;
  }
}

export default IndexPropertiesService;
