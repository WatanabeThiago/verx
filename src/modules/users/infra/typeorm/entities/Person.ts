import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import User from './User';
import Property from '@modules/properties/infra/typeorm/entities/Property';

@Entity('persons')
class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  nationalDocument?: string; // ? CPF or CNPJ

  @OneToOne(() => User, (user) => user.person, { cascade: true })
  user: User;

  @OneToMany(() => Property, (property) => property.person, { cascade: true })
  properties: Property[]

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updateAt: Date;
}

export default Person;
