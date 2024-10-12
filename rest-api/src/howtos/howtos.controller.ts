import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UseGuards, Headers
} from '@nestjs/common';
import { HowtosService } from './howtos.service';
import { CreateHowtoDto } from './dto/create-howto.dto';
import { UpdateHowtoDto } from './dto/update-howto.dto';
import {AuthGuard} from '@nestjs/passport';
import {jwtDecode} from 'jwt-decode';

@UseGuards(AuthGuard('jwt'))
@Controller('howtos')
export class HowtosController {
  constructor(private readonly howtosService: HowtosService) {}

  @Post()
  create(@Body() createHowtoDto: CreateHowtoDto,  @Headers('authorization') authorizationHeader: string) {

    const token = authorizationHeader.split(' ')[1];
    console.log('Token', token);

    const decodedToken: any = jwtDecode(token);

    console.log('Decoded token: ', JSON.stringify(decodedToken, null, 2));

    return this.howtosService.create(createHowtoDto);
  }

  @Get()
  findAll() {
    return this.howtosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.howtosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHowtoDto: UpdateHowtoDto) {
    return this.howtosService.update(+id, updateHowtoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.howtosService.remove(+id);
  }
}
