import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../../users/entities/user.entity';
import {Lesson} from '../../lessons/entities/lesson.entity';

@Entity()
export class Course {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255, nullable: true})
  url: string;

  @Column({type: 'varchar', length: 155})
  title: string;

  @Column({type: 'varchar', length: 255})
  imageUrl: string;

  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
  publishedAt: Date;

  @Column({type: 'int', nullable: true})
  totalTime: number;

  @Column({type: 'text'})
  description: string;

  @Column({type: 'text'})
  content: string;

  @Column({type: 'varchar', default: 'general'})
  level:'beginner' | 'intermediate' | 'advanced';

  @Column({type: 'simple-array'})
  tags: string[];

  @Column({type: 'int', nullable: true, default : 0})
  related: number;

  @OneToMany(() => Lesson, lesson => lesson.course)
  lessons: Lesson[]

  @ManyToOne(() => User, user => user.howtos)
  createdBy: User;

  @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

}
