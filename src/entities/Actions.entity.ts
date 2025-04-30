import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Actions {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  name: string;
}
