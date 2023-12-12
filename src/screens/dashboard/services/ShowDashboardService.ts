import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import IPropertiesRepository from '@modules/properties/repositories/IPropertiesRepository'
import IProductsRepository from '@modules/products/repositories/IProductsRepository'

const states = ["AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR", "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"]


interface IRequest {
  userId: string
}

@injectable()
class ShowDashboardService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('PropertiesRepository')
    private propertiesRepository: IPropertiesRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) { }

  public async execute({ userId }: IRequest): Promise<any> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    const properties = await this.propertiesRepository.index()

    const allProducts = await this.productsRepository.index()

    const propertiesByState = states.map(state => {
      const propertiesInThisState = properties.filter(property => property.state === state)
      const productsInThisState = allProducts.map(product => {
        return {
          name: product.name,
          length: propertiesInThisState.filter(property => {
            return property.products.find(propertyProduct => propertyProduct.productId === product.id)
          }).length
        }
      })
      return {
        state,
        lenght: propertiesInThisState.length,
        vegetationArea: propertiesInThisState.reduce((count, element) => count + element.vegetationArea, 0),
        agriculturalArea: propertiesInThisState.reduce((count, element) => count + element.agriculturalArea, 0),
        products: productsInThisState
      }
    })

    const products = allProducts.map(product => {
      const propertiesWithThisProduct = properties.filter(property => {
        return property.products.find(propertyProduct => propertyProduct.productId === product.id)
      })

      return {
        name: product.name,
        lenght: propertiesWithThisProduct.length,
      }
    })
    console.error(propertiesByState)


    return {
      properties: {
        lenght: properties.length,
        states: propertiesByState,
        vegetationArea: properties.reduce((count, element) => count + element.vegetationArea, 0),
        agriculturalArea: properties.reduce((count, element) => count + element.agriculturalArea, 0),
        totalArea: properties.reduce((count, element) => count + (element.agriculturalArea + element.vegetationArea), 0),
      },
      products,
    }
  }
}

export default ShowDashboardService
