import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  Req,
  UploadedFile,
  Inject,
  Query
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import {AuthGuard} from '@nestjs/passport';
import {imageUploadInterceptor} from '../../utils/file-upload.interceptor';
import {ConfigService} from '@nestjs/config';
import {WINSTON_MODULE_PROVIDER, WinstonLogger} from 'nest-winston';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService,
              private configService: ConfigService,
              @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger
              ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(imageUploadInterceptor('./img-uploads'))
  create(@Body() createLessonDto: CreateLessonDto,
         @Req() request: any,
         @UploadedFile() file: Express.Multer.File) {

    console.log('createLessonDto', createLessonDto);
    console.log('***user:::::', request.createdBy);

    if (file) {
      console.log('File', file);
      createLessonDto.imageUrl = `${this.configService.get('API_URL')}/uploads/${file.filename}`;
      console.log('Create lesson DTO', createLessonDto);
    } else {
      createLessonDto.imageUrl = `${this.configService.get('API_URL')}/uploads/1729373808784-750486698.svg`;
    }

    console.log('Create lesson DTO', createLessonDto);

    return this.lessonsService.create(createLessonDto);
  }

  @Get()
  findAll(@Query() query:any) {

    return this.lessonsService.findAll(+query?.courseId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(imageUploadInterceptor('./img-uploads'))
  update(@Param('id') id: string,
         @Body() updateLessonDto: UpdateLessonDto,
         @UploadedFile() file: Express.Multer.File) {

    if (file) {
      console.log('File', file);
      updateLessonDto.imageUrl = this.configService.get('API_URL') + '/uploads/' + file.filename;
      console.log('updateLessonDto', updateLessonDto);
    }

    this.logger.debug('Updating lesson...', JSON.stringify(updateLessonDto, null, 2));

    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}
