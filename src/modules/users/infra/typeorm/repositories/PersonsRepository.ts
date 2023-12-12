import { Repository } from 'typeorm';

import IPersonsRepository from '../../../repositories/IPersonsRepository';

import Person from '../entities/Person';
import ICreatePersonDTO from '@modules/users/dtos/ICreatePersonDTO';
import AppDataSource from '@shared/infra/typeorm';

class PersonsRepository implements IPersonsRepository {
  private ormRepository: Repository<Person>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Person);
  }

  public async index(): Promise<Person[]> {
    return this.ormRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  public async findByNationalDocument(nationalDocument: string): Promise<Person | undefined> {
    const user = await this.ormRepository.findOne({
      where: { nationalDocument },
    });

    return user || undefined
  }
  public async findById(id: string): Promise<Person | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user || undefined
  }



  public create(data: ICreatePersonDTO): Person {
    const user = this.ormRepository.create(data);

    return user;
  }

  public async save(data: Person): Promise<Person> {
    return this.ormRepository.save(data);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default PersonsRepository;
