import { id } from 'date-fns/locale';
import ICreatePersonDTO from '../../dtos/ICreatePersonDTO';

import Person from '../../infra/typeorm/entities/Person';
import IPersonsRepository from '../IPersonsRepository';
import fakePerson from './seeds/fakePerson';

class FakePersonsRepository implements IPersonsRepository {
  private persons: Person[] = [
    fakePerson
  ];

  public async findById(id: string): Promise<Person | undefined> {
    const person = this.persons.find(item => item.id === id);

    return person;
  }
  public async findByNationalDocument(nationalDocument: string): Promise<Person | undefined> {
    const person = this.persons.find(item => item.nationalDocument === nationalDocument);

    return person;
  }

  public create(data: ICreatePersonDTO): Person {
    const person = new Person();

    Object.assign(person, data);

    this.persons.push(person);

    return person;
  }

  public async save(person: Person): Promise<Person> {
    this.persons.push(person);
    return person;
  }

  public async delete(id: string): Promise<void> {
    const userIndex = this.persons.findIndex(item => item.id === id);

    this.persons.splice(userIndex, 1);
  }
}

export default FakePersonsRepository;
