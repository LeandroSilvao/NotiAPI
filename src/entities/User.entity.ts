import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Channel } from './Channels.entity';
import { Role } from './Role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  enable: boolean;

  @Column({ nullable: true })
  document: string;

  @Column({ nullable: true })
  clientId: string;

  @Column({ nullable: true })
  clientSecret: string;

  @ManyToMany(() => Channel, (channel) => channel.users)
  channels: Channel[];

  @ManyToOne(() => Role, { eager: true })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
