import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Modules {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;
}
