import PropertyProduct from '@modules/properties/infra/typeorm/entities/PropertyProduct';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => PropertyProduct, (propertyProduct) => propertyProduct.property, { cascade: true })
  properties: PropertyProduct[]
}

export default Product;
