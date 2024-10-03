import {IsEmail, IsString} from 'class-validator';
import {Exclude} from 'class-transformer';
import {Unique} from 'typeorm';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password?: string;

  @IsString()
  role: string;

}
