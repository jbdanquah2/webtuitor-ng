import { Routes } from "@angular/router";
import { CoursePostComponent } from "./course-post/course-post.component";
import { CourseRouteActivator } from "./course-post/course-route-activator.service";
import { CourseComponent } from "./course.component";
import {AuthGuard} from '../services/platform-guard';

export const courseRoutes:Routes = [
    {
      path: 'courses',
      component: CourseComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'courses/:link',
      component: CoursePostComponent,
      canActivate: [CourseRouteActivator, AuthGuard]
    }

]
