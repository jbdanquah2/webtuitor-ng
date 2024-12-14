import {ActivatedRouteSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {CourseService} from './course.service';

export const CourseResolver = async (route: ActivatedRouteSnapshot): Promise<any> => {
  const courseService = inject(CourseService);
  const id = route.params['id'];

  const course = await courseService.getCourse(+id);
  // const courseLessons = await courseService.getCourseLessons(course.lessons);

  return {course};
}
