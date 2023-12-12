import "reflect-metadata"
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IIdGeneratorProvider from '@shared/container/IdGeneratorProvider/models/IIdGeneratorProvider'
import IPersonsRepository from '../repositories/IPersonsRepository'
import Person from '../infra/typeorm/entities/Person'
import { } from 'cpf-cnpj-validator'
import cnpjValidator from '@shared/functions/cnpjValidator'
import cpfValidator from '@shared/functions/cpfValidator'
interface IRequest {
  nationalDocument: string
  name: string
}

@injectable()
class CreatePersonService {
  constructor(
    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,

    @inject('IdGeneratorProvider')
    private idGeneratorProvider: IIdGeneratorProvider,
  ) { }

  public async execute({ nationalDocument, name }: IRequest): Promise<Person> {
    const personAlreadyExists = await this.personsRepository.findByNationalDocument(nationalDocument)

    if (personAlreadyExists) {
      throw new AppError('Cadastro de proprietário já existe.', 409)
    }

    if (nationalDocument.length === 14) {
      if (!cnpjValidator(nationalDocument)) {
        throw new AppError('CNPJ inválido.', 400)
      }
    } else {
      if (!cpfValidator(nationalDocument)) {
        throw new AppError('CPF inválido.', 400)
      }
    }

    const person = this.personsRepository.create({
      id: this.idGeneratorProvider.generate(),
      name,
      nationalDocument
    })

    await this.personsRepository.save(person)

    return person
  }
}


export default CreatePersonService
