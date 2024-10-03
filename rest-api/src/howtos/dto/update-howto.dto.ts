import { PartialType } from '@nestjs/mapped-types';
import { CreateHowtoDto } from './create-howto.dto';

export class UpdateHowtoDto extends PartialType(CreateHowtoDto) {}
