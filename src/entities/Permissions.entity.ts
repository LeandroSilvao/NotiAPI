import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Actions } from './Actions.entity';
import { Modules } from './Modules.entity';

@Entity()
export class Permissions {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Modules)
  module: Modules;

  @ManyToOne(() => Actions)
  action: Actions;
}
