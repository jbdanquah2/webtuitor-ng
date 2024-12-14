import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, Req, UploadedFile, Inject} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {AuthGuard} from '@nestjs/passport';
import {imageUploadInterceptor} from '../utils/file-upload.interceptor';
import {CreateHowtoDto} from '../howtos/dto/create-howto.dto';
import {ConfigService} from '@nestjs/config';
import {WINSTON_MODULE_PROVIDER, WinstonLogger} from 'nest-winston';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService,
              private configService: ConfigService,
              @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(imageUploadInterceptor('./img-uploads'))
  create(@Body() createCourseDto: CreateCourseDto,
         @Req() request: any,
         @UploadedFile() file: Express.Multer.File) {

    console.log('createCourseDto', createCourseDto);
    console.log('***user:::::', request.createdBy);

    if (file) {
      console.log('File', file);
      createCourseDto.imageUrl = `${this.configService.get('API_URL')}/uploads/${file.filename}`;
      console.log('Create Course DTO', createCourseDto);
    } else {
      createCourseDto.imageUrl = `${this.configService.get('API_URL')}/uploads/1729373808784-750486698.svg`;
    }

    console.log('Create Course DTO', createCourseDto);

    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(imageUploadInterceptor('./img-uploads'))
  update(@Param('id') id: string,
         @Body() updateCourseDto: UpdateCourseDto,
         @UploadedFile() file: Express.Multer.File) {

    if (file) {
      console.log('File', file);
      updateCourseDto.imageUrl = this.configService.get('API_URL') + '/uploads/' + file.filename;
      console.log('UpdateCourse DTO', updateCourseDto);
    }

    this.logger.debug('Updating course...', JSON.stringify(updateCourseDto, null, 2));

    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }
}
