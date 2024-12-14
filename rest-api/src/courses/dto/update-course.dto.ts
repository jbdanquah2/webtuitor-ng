
import {IsDate, IsOptional, IsString} from 'class-validator';
import {Type} from 'class-transformer';
import {User} from '../../users/entities/user.entity';

export class UpdateCourseDto {

  @IsString()
  url: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsDate()
  @IsOptional()
  publishedAt: Date;

  @IsOptional()
  totalTime: number;

  @IsString()
  description: string;

  @IsString()
  content: string;

  @IsString()
  @IsOptional()
  level:'beginner' | 'intermediate' | 'advanced';

  @IsOptional()
  tags: string[];

  @IsOptional()
  @Type(() => User)
  createdBy: User;

}
