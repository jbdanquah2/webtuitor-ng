import { Routes } from "@angular/router";
import { CoursePostComponent } from "./course-post/course-post.component";
import { CourseRouteActivator } from "./course-post/course-route-activator.service";
import {AuthGuard} from '../services/platform-guard';
import {CourseListComponent} from './course-list/course-list.component';
import {CreateHowtoComponent} from '../howto/create-howto/create-howto.component';
import {CreateCourseComponent} from './create-course/create-course.component';

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
    path: 'courses/:link',
    component: CoursePostComponent,
    canActivate: [CourseRouteActivator, AuthGuard]
  }

]
