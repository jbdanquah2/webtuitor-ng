import { PartialType } from '@nestjs/mapped-types';
import { CreateLessonDto } from './create-lesson.dto';
import {IsBoolean, IsDate, IsOptional, IsString} from 'class-validator';
import {Type} from 'class-transformer';
import {Course} from '../../entities/course.entity';
import {User} from '../../../users/entities/user.entity';

export class UpdateLessonDto {

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  summary: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  imageUrl: string;

  @IsOptional()
  @IsBoolean()
  isPublished: Boolean;

  @IsOptional()
  @Type(() => Course)
  course: Course;

  @IsOptional()
  @Type(() => User)
  createdBy: User;

  @IsDate()
  updatedAt: Date;

}
