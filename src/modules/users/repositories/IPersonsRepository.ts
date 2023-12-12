import Person from '../infra/typeorm/entities/Person';
import ICreatePersonDTO from '../dtos/ICreatePersonDTO';

export default interface IPersonsRepository {
  findById(id: string): Promise<Person | undefined>;
  findByNationalDocument(nationalDocument: string): Promise<Person | undefined>;
  create(data: ICreatePersonDTO): Person
  save(data: Person): Promise<Person>;
  delete(id: string): Promise<void>;
}
