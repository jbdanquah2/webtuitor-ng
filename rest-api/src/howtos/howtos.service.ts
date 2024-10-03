import { Injectable } from '@nestjs/common';
import { CreateHowtoDto } from './dto/create-howto.dto';
import { UpdateHowtoDto } from './dto/update-howto.dto';

@Injectable()
export class HowtosService {
  create(createHowtoDto: CreateHowtoDto) {
    return 'This action adds a new howto';
  }

  findAll() {
    return `This action returns all howtos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} howto`;
  }

  update(id: number, updateHowtoDto: UpdateHowtoDto) {
    return `This action updates a #${id} howto`;
  }

  remove(id: number) {
    return `This action removes a #${id} howto`;
  }
}
