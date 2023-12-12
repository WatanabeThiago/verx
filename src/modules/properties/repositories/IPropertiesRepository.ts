import Property from '../infra/typeorm/entities/Property';
import CreatePropertyDTO from '../dtos/CreatePropertyDTO';
import IIndexPropertiesDTO from '../dtos/IIndexPropertiesDTO';

export default interface IPropertiesRepository {
  index(): Promise<Property[]>;
  filter(data: IIndexPropertiesDTO): Promise<Property[]>;
  findById(id: string): Promise<Property | undefined>;
  create(data: CreatePropertyDTO): Property
  save(data: Property): Promise<Property>;
  delete(id: string): Promise<void>;
}
