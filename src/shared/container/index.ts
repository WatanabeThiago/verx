import ProductsRepository from "@modules/products/infra/typeorm/repositories/ProductsRepository";
import IProductsRepository from "@modules/products/repositories/IProductsRepository";
import PropertiesRepository from "@modules/properties/infra/typeorm/repositories/PropertiesRepository";
import IPropertiesRepository from "@modules/properties/repositories/IPropertiesRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import IPersonsRepository from "@modules/users/repositories/IPersonsRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import { container } from "tsyringe";
import IIdGeneratorProvider from "./IdGeneratorProvider/models/IIdGeneratorProvider";
import IdGeneratorProvider from "./IdGeneratorProvider/implementations/UUIDGeneratorProvider";
import PersonsRepository from "@modules/users/infra/typeorm/repositories/PersonsRepository";
import BCryptHashProvider from "./HashProvider/implementations/BCryptHashProvider";
import IHashProvider from "./HashProvider/models/IHashProvider";

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IIdGeneratorProvider>(
  'IdGeneratorProvider',
  IdGeneratorProvider
);

container.registerSingleton<IPersonsRepository>(
  'PersonsRepository',
  PersonsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IPropertiesRepository>(
  'PropertiesRepository',
  PropertiesRepository,
);
