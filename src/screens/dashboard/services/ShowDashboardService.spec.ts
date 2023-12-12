import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowDashboardService from './ShowDashboardService';
import FakePersonsRepository from '../repositories/fakes/FakePersonsRepository';
import IIdGeneratorProvider from '@shared/container/IdGeneratorProvider/models/IIdGeneratorProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IPersonsRepository from '../repositories/IPersonsRepository';
import FakeIdGeneratorProvider from '@shared/container/IdGeneratorProvider/fakes/FakeIdGeneratorProvider';
import FakePropertiesRepository from '@modules/properties/repositories/fakes/FakePropertiesRepository';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import fakeUser from '../repositories/fakes/seeds/fakeUser';

let fakeUsersRepository: IUsersRepository;
let fakePropertiesRepository: FakePropertiesRepository;
let fakePersonsRepository: IPersonsRepository;
let fakeProductsRepository: FakeProductsRepository;

let showDashboardService: ShowDashboardService;

describe('ShowDashboardService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakePropertiesRepository = new FakePropertiesRepository();
    fakeProductsRepository = new FakeProductsRepository();

    showDashboardService = new ShowDashboardService(fakeUsersRepository, fakePropertiesRepository, fakeProductsRepository);
  });

  it('1. Should be able to create a new user.', async () => {
    // ? Assert
    // ? Act
    const user = await showDashboardService.execute({
      userId: fakeUser.id
    });
    console.log(user)

    // ? Arrange
    expect(user).toMatchObject(
      {
        properties: {
          lenght: 1,
          states: [
            {
              "state": "AC",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "AL",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "AM",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "AP",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "BA",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "CE",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "DF",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "ES",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "GO",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "MA",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "MG",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "MS",
              "lenght": 1,
              "vegetationArea": 200,
              "agriculturalArea": 100,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 1
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 1
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "MT",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "PA",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "PB",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "PE",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "PI",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "PR",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "RJ",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "RN",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "RO",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "RR",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "RS",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "SC",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "SE",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "SP",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            },
            {
              "state": "TO",
              "lenght": 0,
              "vegetationArea": 0,
              "agriculturalArea": 0,
              "products": [
                {
                  "name": "Algodao",
                  "length": 0
                },
                {
                  "name": "Coffee",
                  "length": 0
                },
                {
                  "name": "Milho",
                  "length": 0
                },
                {
                  "name": "Soja",
                  "length": 0
                },
                {
                  "name": "SugarCane",
                  "length": 0
                }
              ]
            }
          ],
          vegetationArea: 200,
          agriculturalArea: 100,
          totalArea: 300
        },
        products: [
          { name: 'Algodao', lenght: 0 },
          { name: 'Coffee', lenght: 1 },
          { name: 'Milho', lenght: 0 },
          { name: 'Soja', lenght: 1 },
          { name: 'SugarCane', lenght: 0 }
        ]
      }
    );
    // expect(user.person.name).toBe(input.name);
    // expect(user.email).toBe(input.email);
  });

});
