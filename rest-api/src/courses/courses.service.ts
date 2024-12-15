import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Course} from './entities/course.entity';
import {Repository} from 'typeorm';
import {plainToClass} from 'class-transformer';
import {Howto} from '../howtos/entities/howto.entity';

@Injectable()
export class CoursesService {

  constructor(@InjectRepository(Course)
              private readonly courseRepository: Repository<Course>){
  }

  create(createCourseDto: CreateCourseDto) {

    const data = this.courseRepository.create(createCourseDto);
    return this.courseRepository.save(data);
  }

  findAll() {
    const data = this.courseRepository.find({
      relations: ['createdBy', 'lessons']
    });

    return plainToClass(Howto, data);
  }

  findOne(id: number) {
    const howto =  this.courseRepository.findOne({
      where: { id },
      relations: ['createdBy', 'lessons']
    });

    return plainToClass(Howto, howto);
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.courseRepository.update(id, updateCourseDto);
  }

  remove(id: number) {
    return this.courseRepository.delete(id);
  }
}
