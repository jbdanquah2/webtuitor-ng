import { Routes } from "@angular/router";
import { CoursePostComponent } from "./course-post/course-post.component";
import { CourseRouteActivator } from "./course-post/course-route-activator.service";
import {AuthGuard} from '../services/platform-guard';
import {CourseListComponent} from './course-list/course-list.component';
import {CreateCourseComponent} from './create-course/create-course.component';
import {CourseResolver} from './course.resolver';
import {EditHowtoComponent} from '../howto/edit-howto/edit-howto.component';
import {EditCourseComponent} from './edit-course/edit-course.component';
import {CreateLessonComponent} from './lesson/create-lesson/create-lesson.component';
import {LessonPostComponent} from './lesson/lesson-post/lesson-post.component';
import {ViewCourseComponent} from './view-course/view-course.component';

export const courseRoutes:Routes = [
  {
    path: 'courses',
    component: CourseListComponent,
    canActivate: [AuthGuard]
  },
  { path: 'courses/create',
    component: CreateCourseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'courses/:id',
    component: ViewCourseComponent, //CoursePostComponent,
    canActivate: [CourseRouteActivator, AuthGuard],
    resolve: {courseData: CourseResolver}
  },
  { path: 'courses/edit/:id',
    component: EditCourseComponent,
    resolve: {courseData: CourseResolver},
    canActivate: [AuthGuard]
  },
  { path: 'courses/:id/lessons/add',
    component: CreateLessonComponent,
    resolve: {courseData: CourseResolver},
    canActivate: [AuthGuard]
  },
  { path: 'courses/:id/lessons/:id/edit',
    component: CreateLessonComponent,
    resolve: {courseData: CourseResolver},
    canActivate: [AuthGuard]
  },
  { path: 'courses/:id/lessons/:lessonId',
    component: ViewCourseComponent,
    resolve: {courseData: CourseResolver},
    canActivate: [AuthGuard]
  }

]
