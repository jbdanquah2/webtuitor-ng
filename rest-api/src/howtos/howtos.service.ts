import { Injectable } from '@nestjs/common';
import { CreateHowtoDto } from './dto/create-howto.dto';
import { UpdateHowtoDto } from './dto/update-howto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Howto } from './entities/howto.entity';
import { Repository } from 'typeorm';
import {plainToClass} from 'class-transformer';

@Injectable()
export class HowtosService {
  constructor(
    @InjectRepository(Howto)
    private readonly howtoRepository: Repository<Howto>,
  ) {}

  create(createHowtoDto: CreateHowtoDto) {
    const data = this.howtoRepository.create(createHowtoDto);
    return this.howtoRepository.save(data);
  }

  findAll() {
    const data = this.howtoRepository.find();

    return plainToClass(Howto, data);
  }

  findOne(id: number) {
    return this.howtoRepository.findOne({
      where: { id },
    });
  }

  update(id: number, updateHowtoDto: UpdateHowtoDto) {
    return this.howtoRepository.update(id, updateHowtoDto);
  }

  remove(id: number) {
    return this.howtoRepository.delete(id);
  }
}
