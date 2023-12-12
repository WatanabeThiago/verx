import "reflect-metadata"
import AppError from '@shared/errors/AppError';

import CreatePropertyService from './CreatePropertyService';
import FakePropertiesRepository from '../repositories/fakes/FakePropertiesRepository';
import IPersonsRepository from '@modules/users/repositories/IPersonsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import FakePersonsRepository from '@modules/users/repositories/fakes/FakePersonsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeIdGeneratorProvider from '@shared/container/IdGeneratorProvider/fakes/FakeIdGeneratorProvider';
import IIdGeneratorProvider from '@shared/container/IdGeneratorProvider/models/IIdGeneratorProvider';
import fakeUser from '@modules/users/repositories/fakes/seeds/fakeUser';
import fakePerson from '@modules/users/repositories/fakes/seeds/fakePerson';
import { fakeSoja } from "@modules/products/repositories/fakes/seeds/fakeProducts";
import IProductsRepository from "@modules/products/repositories/IProductsRepository";
import FakeProductsRepository from "@modules/products/repositories/fakes/FakeProductsRepository";
import IPropertiesRepository from "../repositories/IPropertiesRepository";

let fakePropertiesRepository: IPropertiesRepository;
let fakeUsersRepository: IUsersRepository;
let fakePersonsRepository: IPersonsRepository;
let fakeProductsRepository: IProductsRepository;
let idGeneratorProvider: IIdGeneratorProvider;

let createPropertieService: CreatePropertyService;

describe('CreatePropertyService', () => {
  beforeEach(() => {
    fakePropertiesRepository = new FakePropertiesRepository();
    fakeUsersRepository = new FakeUsersRepository();
    idGeneratorProvider = new FakeIdGeneratorProvider();
    fakeProductsRepository = new FakeProductsRepository();
    fakePersonsRepository = new FakePersonsRepository();

    createPropertieService = new CreatePropertyService(fakeUsersRepository, fakePropertiesRepository, fakePersonsRepository, fakeProductsRepository, idGeneratorProvider);
  });

  it('1. Should be able to create a new product', async () => {
    // ? Arrange
    const address = {
      country: "BR",
      state: "MS",
      city: "Campo Grande",
      line1: "Rua Levi Campanha, 109",
      line2: "", // Complemento
      geoX: 2022,
      geoY: -202.3
    }
    const agriculturalArea = 100
    const vegetationArea = 200
    const totalArea = 10000
    // ? Act

    // ? Assert
    const property = await createPropertieService.execute({
      address,
      agriculturalArea,
      totalArea,
      vegetationArea,
      person: {
        nationalDocument: fakePerson.nationalDocument!
      },
      name: "Fazenda Boi Gordo",
      userId: fakeUser.id,
      products: [{
        active: true,
        id: fakeSoja.id
      }]
    });

    expect(property).toHaveProperty('id');
    expect(property.person.id).toBe(fakePerson.id);
  });
  it('2. Should not be able to accept invalid user.', async () => {
    // ? Arrange
    const address = {
      country: "BR",
      state: "MS",
      city: "Campo Grande",
      line1: "Rua Levi Campanha, 109",
      line2: "", // Complemento
      geoX: 2022,
      geoY: -202.3
    }
    const agriculturalArea = 100
    const vegetationArea = 200
    const totalArea = 10000
    // ? Act

    // ? Assert
    expect(createPropertieService.execute({
      address,
      agriculturalArea,
      totalArea,
      vegetationArea,
      person: {
        nationalDocument: fakePerson.nationalDocument!
      },
      name: "Fazenda Boi Gordo",
      userId: 'invalidUserId',
      products: [{
        active: true,
        id: fakeSoja.id,
      }]
    })).rejects.toBeInstanceOf(AppError)
  });
  it('3. Should not be able to accept agriculturalArea more than totalArea.', async () => {
    // ? Arrange
    const address = {
      country: "BR",
      state: "MS",
      city: "Campo Grande",
      line1: "Rua Levi Campanha, 109",
      line2: "", // Complemento
      geoX: 2022,
      geoY: -202.3
    }
    const agriculturalArea = 100
    const vegetationArea = 1
    const totalArea = 2
    // ? Act

    // ? Assert
    expect(createPropertieService.execute({
      address,
      agriculturalArea,
      totalArea,
      vegetationArea,
      person: {
        nationalDocument: fakePerson.nationalDocument!
      },
      name: "Fazenda Boi Gordo",
      userId: fakeUser.id,
      products: [{
        active: true,
        id: fakeSoja.id
      }]
    })).rejects.toBeInstanceOf(AppError)
  });
  it('4. Should not be able to accept vegetationArea more than totalArea.', async () => {
    // ? Arrange
    const address = {
      country: "BR",
      state: "MS",
      city: "Campo Grande",
      line1: "Rua Levi Campanha, 109",
      line2: "", // Complemento
      geoX: 2022,
      geoY: -202.3
    }
    const agriculturalArea = 1
    const vegetationArea = 100
    const totalArea = 2
    // ? Act

    // ? Assert
    expect(createPropertieService.execute({
      address,
      agriculturalArea,
      totalArea,
      vegetationArea,
      person: {
        nationalDocument: fakePerson.nationalDocument!
      },
      name: "Fazenda Boi Gordo",
      userId: fakeUser.id,
      products: [{
        active: true,
        id: fakeSoja.id
      }]
    })).rejects.toBeInstanceOf(AppError)
  });
  it('5. Should not be able to accept not valid owner.', async () => {
    // ? Arrange
    const address = {
      country: "BR",
      state: "MS",
      city: "Campo Grande",
      line1: "Rua Levi Campanha, 109",
      line2: "", // Complemento
      geoX: 2022,
      geoY: -202.3
    }
    const agriculturalArea = 1
    const vegetationArea = 100
    const totalArea = 9999
    // ? Act

    // ? Assert
    expect(createPropertieService.execute({
      address,
      agriculturalArea,
      totalArea,
      vegetationArea,
      person: {
        nationalDocument: "invalid"
      },
      name: "Fazenda Boi Gordo",
      userId: fakeUser.id,
      products: [{
        active: true,
        id: fakeSoja.id
      }]
    })).rejects.toBeInstanceOf(AppError)
  });

  it('6. agriculturalArea + vegetationArea cannot more than totalArea', async () => {
    // ? Arrange
    const address = {
      country: "BR",
      state: "MS",
      city: "Campo Grande",
      line1: "Rua Levi Campanha, 109",
      line2: "", // Complemento
      geoX: 2022,
      geoY: -202.3
    }
    const agriculturalArea = 51
    const vegetationArea = 51
    const totalArea = 100
    // ? Act

    // ? Assert
    expect(createPropertieService.execute({
      address,
      agriculturalArea,
      totalArea,
      vegetationArea,
      person: {
        nationalDocument: "invalid"
      },
      name: "Fazenda Boi Gordo",
      userId: fakeUser.id,
      products: [{
        active: true,
        id: fakeSoja.id
      }]
    })).rejects.toBeInstanceOf(AppError)
  });

  it('7. Should not be able to accept invalid product', async () => {
    // ? Arrange
    const address = {
      country: "BR",
      state: "MS",
      city: "Campo Grande",
      line1: "Rua Levi Campanha, 109",
      line2: "", // Complemento
      geoX: 2022,
      geoY: -202.3
    }
    const agriculturalArea = 51
    const vegetationArea = 51
    const totalArea = 100
    // ? Act

    // ? Assert
    expect(createPropertieService.execute({
      address,
      agriculturalArea,
      totalArea,
      vegetationArea,
      person: {
        nationalDocument: fakePerson.nationalDocument!
      },
      name: "Fazenda Boi Gordo",
      userId: fakeUser.id,
      products: [{
        active: true,
        id: 99999
      }]
    })).rejects.toBeInstanceOf(AppError)
  });
});
