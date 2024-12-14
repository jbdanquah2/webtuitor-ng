import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Course} from '../../entities/course.entity';
import {User} from '../../../users/entities/user.entity';

@Entity()
export class Lesson {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255})
  title: string;

  @Column({type: 'text'})
  summary: string;

  @Column({type: 'text'})
  content: string;

  @Column({type: 'varchar', length: 255, nullable: true})
  url: string;

  @Column({type: 'varchar', length: 255})
  imageUrl: string;

  @Column({type: 'boolean', default: false})
  isPublished: Boolean;

  @ManyToOne(() => Course, course => course.lessons)
  course: Course;

  @ManyToOne(() => User, user => user.howtos)
  createdBy: User;

  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date;

}
