import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import IIdGeneratorProvider from '@shared/container/IdGeneratorProvider/models/IIdGeneratorProvider'
import authConfig from '@config/auth';
import IPersonsRepository from '../repositories/IPersonsRepository'
import Person from '../infra/typeorm/entities/Person'
import IHashProvider from '@shared/container/HashProvider/models/IHashProvider'

interface IRequest {
  email: string
  password: string
  name: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,

    @inject('IdGeneratorProvider')
    private idGeneratorProvider: IIdGeneratorProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ email, password, name }: IRequest): Promise<Person> {
    const emailAreadyExists = await this.usersRepository.findByEmail(email)
    if (emailAreadyExists) {
      throw new AppError('Email já está em uso.', 409)
    }

    const user = this.usersRepository.create({
      id: this.idGeneratorProvider.generate(),
      email,
      password: await this.hashProvider.generateHash(password)
    })

    const person = this.personsRepository.create({
      id: this.idGeneratorProvider.generate(),
      name,
    })

    person.user = user

    await this.personsRepository.save(person)

    return person
  }
}

export default CreateUserService
