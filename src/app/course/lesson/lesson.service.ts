import { Injectable } from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../user/auth.service';

@Injectable()
export class LessonService {

  courses: any[] = [];

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {

  }

  async createLesson(lesson: any, file: File) {
    try {
      const formData = new FormData();

      formData.append('title', lesson.title);
      formData.append('summary', lesson.summary);
      formData.append('url', lesson.url);
      formData.append('content', lesson.content);
      formData.append('isPublished', lesson.isPublished);
      formData.append('createdBy', this.authService.currentUser.id.toString());

      if (file) {
        formData.append('file', file);
      }

      console.log(':::FormData', formData);

      // Send the form data via POST request
      const response = await firstValueFrom(this.httpClient.post<any>(environment.api.createCourse, formData));

      if (response?.id) {
        console.log('Course created successfully');
        return response;
      } else {
        console.log('Course creation failed', response);
        return null;
      }
    } catch (error) {
      console.log('Course creation failed', error);
      return null;
    }
  }

  async editLesson(id: any, course: any, file: File) {

    console.log('Service Course', course);

    try {
      const formData = new FormData();

      formData.append('title', course.title);
      formData.append('description', course.description);
      formData.append('url', course.url);
      formData.append('level', course.level);
      formData.append('content', course.content);
      formData.append('tags', course.tags);
      formData.append('totalTime', course.totalTime);
      formData.append('createdBy', this.authService.currentUser.id.toString());

      if (file) {
        formData.append('file', file);
      }

      console.log(':::FormData', formData);

      // Send the form data via POST request
      const response = await firstValueFrom(this.httpClient.patch<any>(environment.api.editCourse + '/' + id, formData));

      if (response?.id) {
        console.log('Course updated successfully');
        return response;
      } else {
        console.log('Course update failed', response);
        return null;
      }
    } catch (error) {
      console.log('Course update failed', error);
      return null;
    }
  }

  async deleteLesson(id: any) {
    try {
      const response = await firstValueFrom(this.httpClient.delete<any>(environment.api.deleteCourse + '/' + id));

      if (response?.affected == 1) {
        console.log('Course deleted successfully');
        return response;
      } else {
        console.log('Course deletion failed', response);
        return null;
      }
    } catch (error) {
      console.log('Course deletion failed', error);
      return null;
    }
  }

  async getLessons() {

    this.courses = await firstValueFrom(this.httpClient.get<any>(environment.api.getCourses));
    return this.courses;
  }

  async getLesson(id: number) {

   try {

     if (this.courses?.length) {
       console.log('course found in cache');
       return this.courses.find(course => course.id == +id);
     }

     console.log('course NOT found in cache, id', id );

     const course =  await firstValueFrom(this.httpClient.get<any>(environment.api.getCourse + '/' + id));

     console.log('<><Course', course);
     return course;

   } catch (e) {

      console.log('Error fetching course', e);
      return {};

   }
  }



}

