import AppError from '@shared/errors/AppError';

import CreatePersonService from './CreatePersonService';
import FakePersonsRepository from '../repositories/fakes/FakePersonsRepository';
import IIdGeneratorProvider from '@shared/container/IdGeneratorProvider/models/IIdGeneratorProvider';
import IPersonsRepository from '../repositories/IPersonsRepository';
import FakeIdGeneratorProvider from '@shared/container/IdGeneratorProvider/fakes/FakeIdGeneratorProvider';

let fakePersonsRepository: IPersonsRepository;
let idGeneratorProvider: IIdGeneratorProvider;
let createPersonService: CreatePersonService;

describe('CreatePersonService', () => {
  beforeEach(() => {
    idGeneratorProvider = new FakeIdGeneratorProvider();
    fakePersonsRepository = new FakePersonsRepository();

    createPersonService = new CreatePersonService(fakePersonsRepository, idGeneratorProvider);
  });

  it('1. Should be able to create a new person.', async () => {
    // ? Assert
    const input = {
      name: "Thiago Watanabe",
      nationalDocument: '65254335092'
    }
    // ? Act
    const person = await createPersonService.execute(input);

    // ? Arrange
    expect(person).toHaveProperty('id');
    expect(person.name).toBe(input.name);
    expect(person.nationalDocument).toBe(input.nationalDocument);
  });
  it('2. Should not be able to create duplicated national document.', async () => {
    // ? Assert
    const input = {
      name: "Thiago Watanabe",
      nationalDocument: '65254335092'
    }
    // ? Act
    await createPersonService.execute(input);

    // ? Arrange
    expect(createPersonService.execute(input)).rejects.toBeInstanceOf(AppError)
  });
});
