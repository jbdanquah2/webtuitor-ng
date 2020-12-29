import { Routes } from "@angular/router";
import { CoursePostComponent } from "./course-post/course-post.component";
import { CourseRouteActivator } from "./course-post/course-route-activator.service";
import { CourseComponent } from "./course.component";

export const courseRoutes:Routes = [
    { path: 'courses', component: CourseComponent },
    { path: 'courses/:link', component: CoursePostComponent, canActivate: [CourseRouteActivator] }

]