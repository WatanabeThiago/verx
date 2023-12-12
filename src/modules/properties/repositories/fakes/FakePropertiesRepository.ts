import CreatePropertyDTO from "@modules/properties/dtos/CreatePropertyDTO";
import Property from "@modules/properties/infra/typeorm/entities/Property";
import IPropertiesRepository from "../IPropertiesRepository";
import fakeProperty from "./seeds/fakeProperty";
import IIndexPropertiesDTO from "@modules/properties/dtos/IIndexPropertiesDTO";

class FakePropertiesRepository implements IPropertiesRepository {
  private properties: Property[] = [fakeProperty];

  public async index(): Promise<Property[]> {
    return this.properties;
  }
  public async filter(data: IIndexPropertiesDTO): Promise<Property[]> {
    return this.properties;
  }

  public async findByName(name: string): Promise<Property | undefined> {
    const properties = this.properties.find(item => item.name === name);

    return properties;
  }

  public async findById(id: string): Promise<Property | undefined> {
    const properties = this.properties.find(item => item.id === id);

    return properties;
  }

  public create(data: CreatePropertyDTO): Property {
    const properties = new Property();

    Object.assign(properties, data);

    return properties;
  }

  public async save(properties: Property): Promise<Property> {
    this.properties.push(properties);
    return properties;
  }

  public async delete(id: string): Promise<void> {
    const userIndex = this.properties.findIndex(item => item.id === id);

    this.properties.splice(userIndex, 1);
  }
}

export default FakePropertiesRepository;
