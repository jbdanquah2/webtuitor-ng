import {IsOptional, IsString} from 'class-validator';
import {User} from '../../users/entities/user.entity';

export class CreateHowtoDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  content: string;

  @IsString()
  tags: string;

  @IsOptional()
  user: User;
}
