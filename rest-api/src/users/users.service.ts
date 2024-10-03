import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {Repository} from 'typeorm';
import {User} from './entities/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {plainToClass} from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  create(createUserDto: CreateUserDto) {
    const data = this.userRepository.create(createUserDto);
    const user = this.userRepository.save(data);
    return plainToClass(User, user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: {id}
    });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({email})
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      return null;
    }

    if (updateUserDto.name) {
      user.name = updateUserDto.name;
    }
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    if (updateUserDto.password) {
      user.password = await bcrypt.hash(updateUserDto.password, await bcrypt.genSalt());
    }

    return await this.userRepository.save(user);
  }


  remove(id: number) {
    return this.userRepository.delete(id);
  }
}

