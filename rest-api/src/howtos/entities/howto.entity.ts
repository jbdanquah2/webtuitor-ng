import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../../users/entities/user.entity';

@Entity()
export class Howto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 155})
  title: string;

  @Column({type: 'varchar', length: 255})
  description: string;

  @Column({type: 'varchar', default: 'general'})
  category: string;

  @Column({type: 'text'})
  content: string;

  @Column({type: 'simple-array'})
  tags: string;

  @ManyToOne(() => User, user => user.howtos)
  user: User
}
