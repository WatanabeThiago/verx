import AppError from '@shared/errors/AppError';

import FakePropertiesRepository from '../repositories/fakes/FakePropertiesRepository';
import DeletePropertyService from './DeletePropertyService';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import fakeUser from '@modules/users/repositories/fakes/seeds/fakeUser';
import fakeProperty from '../repositories/fakes/seeds/fakeProperty';

let fakePropertiesRepository: FakePropertiesRepository;

let deletePropertyService: DeletePropertyService;
let fakeUsersRepository: IUsersRepository;

describe('DeletePropertyService', () => {
  beforeEach(() => {
    fakePropertiesRepository = new FakePropertiesRepository();
    fakeUsersRepository = new FakeUsersRepository();

    deletePropertyService = new DeletePropertyService(fakePropertiesRepository, fakeUsersRepository);
  });

  it('1. Should be able to property a breed', async () => {
    const deleteSpy = jest.spyOn(fakePropertiesRepository, 'delete');

    await deletePropertyService.execute({
      propertyId: fakeProperty.id,
      userId: fakeUser.id
    })

    expect(deleteSpy).toBeCalledWith(fakeProperty.id);
  });

  it('2. Should not be able to delete a invalid property', async () => {
    await expect(deletePropertyService.execute({ propertyId: "invalid", userId: fakeUser.id })).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('3. Should not be able to delete a invalid user', async () => {
    await expect(deletePropertyService.execute({ propertyId: fakeProperty.id, userId: "invalidUserId" })).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
