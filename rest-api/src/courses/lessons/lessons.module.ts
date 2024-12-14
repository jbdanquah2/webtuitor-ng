import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Lesson} from './entities/lesson.entity';
import {User} from '../../users/entities/user.entity';
import {Course} from '../entities/course.entity';


@Module({

  imports: [
    TypeOrmModule.forFeature([
      Lesson,
      User,
      Course
    ])
  ],

  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
