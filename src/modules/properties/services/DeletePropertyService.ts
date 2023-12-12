import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPropertiesRepository from '../repositories/IPropertiesRepository';
import Property from '../infra/typeorm/entities/Property';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  propertyId: string;
  userId: string;
}

@injectable()
class DeletePropertyService {
  constructor(
    @inject('PropertysRepository')
    private propertiesRepository: IPropertiesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({ propertyId, userId }: IRequest): Promise<Property> {
    const property = await this.propertiesRepository.findById(propertyId);
    if (!property) {
      throw new AppError(`Propriedade não encontrado.`, 404);
    }

    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new AppError(`Usuário não encontrado.`, 404);
    }

    await this.propertiesRepository.delete(propertyId);

    return property;
  }
}

export default DeletePropertyService;
