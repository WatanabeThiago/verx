import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Person from './Person';
import { Exclude } from 'class-transformer';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ name: "person_id" })
  personId: string

  @OneToOne(() => Person, (person) => person.user)
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @CreateDateColumn()
  created_at: Date;
}

export default User;
