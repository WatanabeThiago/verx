import Product from '@modules/products/infra/typeorm/entities/Product';
import Property from '@modules/properties/infra/typeorm/entities/Property';
import PropertyProduct from '@modules/properties/infra/typeorm/entities/PropertyProduct';
import Person from '@modules/users/infra/typeorm/entities/Person';
import User from '@modules/users/infra/typeorm/entities/User';
import { DataSource } from 'typeorm';

console.log('[BANCO DE DADOS 🎲] Tentando conectar.');

const AppDataSource = new DataSource({
  type: "postgres",
  url: "postgres://verx_user:verx_password@localhost:5432/verx_database",

  entities: [
    User,
    Product,
    Person,
    Property,
    PropertyProduct,
  ],
  migrations: ['./migrations/*.ts'],
  synchronize: false,
  logging: true,
  installExtensions: true
})

AppDataSource.initialize()
  .then(() => {
    AppDataSource.runMigrations()
    console.log('[DATABASE] Typeorm initiazed.')
  })
  .catch((error) => console.log(error))


export default AppDataSource
