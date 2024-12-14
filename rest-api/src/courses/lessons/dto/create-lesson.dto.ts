import {Course} from '../../entities/course.entity';
import {IsBoolean, IsDate, IsOptional, IsString} from 'class-validator';
import {Type} from 'class-transformer';
import {User} from '../../../users/entities/user.entity';

export class CreateLessonDto {

  @IsString()
  title: string;

  @IsString()
  summary: string;

  @IsString()
  content: string;

  @IsString()
  url: string;

  @IsString()
  imageUrl: string;

  @IsBoolean()
  isPublished: Boolean;

  @Type(() => Course)
  course: Course;

  @IsOptional()
  @Type(() => User)
  createdBy: User;

  @IsDate()
  createdAt: Date;

}
