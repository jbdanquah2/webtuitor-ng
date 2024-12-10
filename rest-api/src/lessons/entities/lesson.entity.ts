import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Course} from '../../courses/entities/course.entity';

@Entity()
export class Lesson {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255})
  title: string;

  @Column({type: 'text'})
  content: string

  @Column({type: 'varchar', length: 255, nullable: true})
  url: string;

  @Column({type: 'varchar', length: 255})
  imageUrl: string;

  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
  publishedAt: Date;

  @Column({type: 'int', nullable: true})
  totalTime: number;

  @Column({type: 'text'})
  description: string;

  @Column({type: 'varchar', default: 'general'})
  level:'beginner' | 'intermediate' | 'advanced';

  @Column({type: 'simple-array'})
  tags: string[];

  @ManyToOne(() => Course, course => course.lessons)
  course: Course;

  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

}
