import {IsArray, IsDate, IsInt, IsOptional, IsString} from 'class-validator';
import {Type} from 'class-transformer';
import {User} from '../../users/entities/user.entity';

export class CreateHowtoDto {
  @IsString()
  title: string;

  @IsString()
  url: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  content: string;

  @IsOptional()
  totalTime: number;

  @IsOptional()
  @IsArray()
  tags: string;

  @IsOptional()
  @IsInt()
  related: number;

  @IsOptional()
  @Type(() => User)
  user: User;

  @IsDate()
  created_at: Date;

}


