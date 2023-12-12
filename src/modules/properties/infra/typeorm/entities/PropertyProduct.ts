import {
  Entity,
  Column,
  CreateDateColumn,
  JoinColumn,
  PrimaryColumn,
  ManyToOne,
} from 'typeorm';

import Property from './Property';
import Product from '@modules/products/infra/typeorm/entities/Product';

@Entity('property_products')
class PropertyProduct {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: "property_id" })
  propertyId: string;

  @Column({ name: "product_id" })
  productId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // ? Relations
  @ManyToOne(() => Property, (property) => property.products)
  @JoinColumn({ name: "property_id" })
  property: Property;

  @ManyToOne(() => Product, (product) => product.properties)
  @JoinColumn({ name: "product_id" })
  product: Product
}

export default PropertyProduct;
