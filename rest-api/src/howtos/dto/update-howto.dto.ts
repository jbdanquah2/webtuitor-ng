import {IsArray, IsDate, IsInt, IsOptional, IsString} from 'class-validator';

export class UpdateHowtoDto  {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  url: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsOptional()
  @IsInt()
  totalTime: number;

  @IsOptional()
  @IsArray()
  tags: string;

  @IsOptional()
  @IsInt()
  related: number;

}
