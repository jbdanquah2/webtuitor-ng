import { Injectable } from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthService} from '../user/auth.service';

@Injectable()
export class CourseService {

  courses: any[] = [];

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {

  }

  async createCourse(course: any, file: File) {
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

  async editCourse(id: any, course: any, file: File) {

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

  async deleteCourse(id: any) {
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

  async getCourses() {

    this.courses = await firstValueFrom(this.httpClient.get<any>(environment.api.getCourses));
    return this.courses;
  }

  async getCourse(id: number) {

   try {

     if (this.courses?.length) {
       console.log('Found course in cache');
       return this.courses.find(course => course.id == +id);
     }

     console.log('course NOT found in cache, id', id );

     const course =  await firstValueFrom(this.httpClient.get<any>(environment.api.getCourse + '/' + id));

     this.courses.push(course);

     console.log('<><Course', course);
     return course;

   } catch (e) {

      console.log('Error fetching course', e);
      return {};

   }
  }
}

