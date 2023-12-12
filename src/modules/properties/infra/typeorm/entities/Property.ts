import Person from '@modules/users/infra/typeorm/entities/Person';
import { Point } from 'geojson';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import PropertyProduct from './PropertyProduct';

@Entity('properties')
class Property {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  line1: string;

  @Column()
  line2: string;

  @Column({ type: 'geography', spatialFeatureType: 'POINT' })
  geolocation: Point;

  @Column({ name: 'total_area' })
  totalArea: number;

  @Column({ name: 'person_id' })
  personId: string;

  @Column({ name: "agricultural_area" })
  agriculturalArea: number;

  @Column({ name: "vegetation_area" })
  vegetationArea: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  // ? Relations
  @OneToOne(() => Person, (person) => person.properties)
  @JoinColumn({ name: "person_id" })
  person: Person;

  @OneToMany(() => PropertyProduct, (propertyProduct) => propertyProduct.property, { cascade: true })
  products: PropertyProduct[]

}

export default Property;
