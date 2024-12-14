import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Course} from '../entities/course.entity';
import {Repository} from 'typeorm';
import {Lesson} from './entities/lesson.entity';
import {plainToClass} from 'class-transformer';
import {Howto} from '../../howtos/entities/howto.entity';

@Injectable()
export class LessonsService {

  constructor(@InjectRepository(Lesson)
              private readonly lessonRepository: Repository<Lesson>) {
  }

  create(createLessonDto: CreateLessonDto) {

    const data = this.lessonRepository.create(createLessonDto);

    return this.lessonRepository.save(data);
  }

  async findAll(courseId?: number) {
    const whereCondition = courseId ? { course: { id: courseId } } : {};

    const data =  this.lessonRepository.find({
      where: whereCondition,
      relations: ['createdBy', 'course'],
    });

    return plainToClass(Lesson, data);
  }


  findOne(id: number) {
    const lesson =  this.lessonRepository.findOne({
      where: { id },
      relations: ['createdBy', 'course']
    });

    return plainToClass(Lesson, lesson);
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return this.lessonRepository.update(id, updateLessonDto);
  }

  remove(id: number) {
    return this.lessonRepository.delete(id);
  }
}
