import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UseGuards, Headers, UseInterceptors, UploadedFile
} from '@nestjs/common';
import { HowtosService } from './howtos.service';
import { CreateHowtoDto } from './dto/create-howto.dto';
import { UpdateHowtoDto } from './dto/update-howto.dto';
import {AuthGuard} from '@nestjs/passport';
import {FileInterceptor} from '@nestjs/platform-express';
import {extname} from 'path';
import { diskStorage } from 'multer';
import {imageUploadInterceptor} from '../utils/file-upload.interceptor';

@UseGuards(AuthGuard('jwt'))
@Controller('howtos')
export class HowtosController {
  constructor(private readonly howtosService: HowtosService) {}

  @Post()
  @UseInterceptors(imageUploadInterceptor('./img-uploads'))
  create(@Body() createHowtoDto: CreateHowtoDto,
         @UploadedFile() file: Express.Multer.File,
         @Headers('authorization') authorizationHeader: string) {

    console.log('createHowtoDto', createHowtoDto);
    console.log('##file', file);

    const token = authorizationHeader.split(' ')[1];
    // console.log('Token', token);

    if (file) {

      console.log('File', file);
      createHowtoDto.imageUrl = file.path; // Save the file path to DTO
      console.log('Create Howto DTO', createHowtoDto);
    }

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
