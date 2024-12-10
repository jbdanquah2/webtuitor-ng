import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Course} from './entities/course.entity';
import { User } from 'src/users/entities/user.entity';
import {ConfigModule} from '@nestjs/config';
import {Lesson} from '../lessons/entities/lesson.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Course,
      User,
      Lesson
    ]),
    ConfigModule
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {
}

