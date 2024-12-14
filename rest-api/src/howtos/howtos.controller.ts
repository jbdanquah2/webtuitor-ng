import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UseGuards, Headers, UseInterceptors, UploadedFile, Req, Inject
} from '@nestjs/common';
import { HowtosService } from './howtos.service';
import { CreateHowtoDto } from './dto/create-howto.dto';
import { UpdateHowtoDto } from './dto/update-howto.dto';
import {AuthGuard} from '@nestjs/passport';
import {imageUploadInterceptor} from '../utils/file-upload.interceptor';
import {ConfigService} from '@nestjs/config';
import {WINSTON_MODULE_PROVIDER, WinstonLogger} from 'nest-winston';


@Controller('howtos')
export class HowtosController {

  constructor(private readonly howtosService: HowtosService,
              private configService: ConfigService,
              @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(imageUploadInterceptor('./img-uploads'))
  create(@Body() createHowtoDto: CreateHowtoDto,
         @Req() request: any,
         @UploadedFile() file: Express.Multer.File,
         ) {

    console.log('createHowtoDto', createHowtoDto);
    console.log('***user:::::', request.user);

    if (file) {
      console.log('File', file);
      createHowtoDto.imageUrl = `${this.configService.get('API_URL')}/uploads/${file.filename}`;
      console.log('Create Howto DTO', createHowtoDto);
    } else {
      createHowtoDto.imageUrl = `${this.configService.get('API_URL')}/uploads/1729373808784-750486698.svg`;
    }

    console.log('Create Howto DTO', createHowtoDto);

    return this.howtosService.create(createHowtoDto);
  }

  @Get()
  findAll() {
    return this.howtosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.debug('Finding one howto...');

    return this.howtosService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(imageUploadInterceptor('./img-uploads'))
  update(@Param('id') id: string,
         @Body() updateHowtoDto: UpdateHowtoDto,
         @UploadedFile() file: Express.Multer.File) {

    if (file) {
      console.log('File', file);
      updateHowtoDto.imageUrl = this.configService.get('API_URL') + '/uploads/' + file.filename;
      console.log('Update Howto DTO', updateHowtoDto);
    }

    console.log('>>>Update Howto DTO', updateHowtoDto);
    return this.howtosService.update(+id, updateHowtoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    console.log('Removing howto...', id);
    return this.howtosService.remove(+id);
  }
}
