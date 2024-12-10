import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../../users/entities/user.entity';

@Entity()
export class Howto {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255})
  url: string;

  @Column({type: 'varchar', length: 155})
  title: string;

  @Column({type: 'varchar', length: 255})
  description: string;

  @Column({type: 'varchar', nullable: true})
  imageUrl: string;

  @Column({type: 'varchar', default: 'general'})
  category: string;

  @Column({type: 'text'})
  content: string;

  @Column({type: 'int', nullable: true})
  totalTime: number;

  @Column({type: 'simple-array'})
  tags: string;

  @Column({type: 'int', nullable: true, default : 0})
  related: number;

  @ManyToOne(() => User, user => user.howtos)
  user: User;

  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

}
