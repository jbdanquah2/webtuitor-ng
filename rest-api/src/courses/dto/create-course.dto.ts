import {User} from '../../users/entities/user.entity';
import {IsDate, IsOptional, IsString} from 'class-validator';
import {Type} from 'class-transformer';
import {Lesson} from '../../lessons/entities/lesson.entity';

export class CreateCourseDto {

  @IsString()
  url: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsDate()
  publishedAt: Date;

  @IsOptional()
  totalTime: number;

  @IsString()
  description: string;

  @IsString()
  content: string;

  @IsString()
  level:'beginner' | 'intermediate' | 'advanced';

  @IsOptional()
  tags: string[];

  @IsOptional()
  related: number;

  @IsOptional()
  @Type(() => Lesson)
  lessons?: Lesson[];

  @IsOptional()
  @Type(() => User)
  createdBy: User;

  @IsDate()
  created_at: Date;

}

