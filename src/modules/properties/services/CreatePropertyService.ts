import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IPropertiesRepository from '../repositories/IPropertiesRepository';
import Property from '../infra/typeorm/entities/Property';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IPersonsRepository from '@modules/users/repositories/IPersonsRepository';
import IIdGeneratorProvider from '@shared/container/IdGeneratorProvider/models/IIdGeneratorProvider';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

interface IRequest {
  userId: string
  name: string;
  address: {
    country: string;
    state: string;
    city: string;
    line1: string;
    line2: string;

    geoX: number
    geoY: number
  }
  person: {
    nationalDocument: string
  },
  products: {
    id: number
    active: boolean
  }[]
  totalArea: number
  agriculturalArea: number;
  vegetationArea: number;
}

@injectable()
class CreatePropertyService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PropertiesRepository')
    private propertiesRepository: IPropertiesRepository,

    @inject('PersonsRepository')
    private personsRepository: IPersonsRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('IdGeneratorProvider')
    private idGeneratorProvider: IIdGeneratorProvider,
  ) { }

  public async execute({
    userId,
    agriculturalArea,
    address,
    name,
    totalArea,
    vegetationArea,
    person,
    products
  }: IRequest): Promise<Property> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new AppError('Usuário não encontrado.', 404)
    }

    if (agriculturalArea >= totalArea) {
      throw new AppError('Área agrícola deve ser menor que área total.', 400)
    }
    if (vegetationArea >= totalArea) {
      throw new AppError('Área de vegetação deve ser menor que área total.', 400)
    }

    const owner = await this.personsRepository.findByNationalDocument(person.nationalDocument)
    if (!owner) {
      throw new AppError('Cadastro para dono de propriedade não encontrado', 404)
    }

    const existentProducts = await this.productsRepository.index()
    products.forEach(product => {
      const productExists = existentProducts.find(existentProduct => product.id === existentProduct.id)
      if (!productExists) {
        throw new AppError('Produto não encontrado.', 404)
      }
    })

    const propertyId = this.idGeneratorProvider.generate()
    console.log(products.map(product => ({
      productId: product.id,
      active: product.active,
      propertyId
    })))
    const property = this.propertiesRepository.create({
      id: propertyId,
      name,
      country: address.country,
      state: address.state,
      city: address.city,
      line1: address.line1,
      line2: address.line2,
      totalArea: agriculturalArea + vegetationArea,
      agriculturalArea: agriculturalArea,
      vegetationArea: vegetationArea,
      person: owner,
      geolocation: {
        coordinates: [address.geoX, address.geoY],
        type: 'Point'
      },
      products: products.map(product => ({
        productId: product.id,
        active: product.active,
        propertyId
      }))
    })

    await this.propertiesRepository.save(property)


    return property;
  }
}

export default CreatePropertyService;
