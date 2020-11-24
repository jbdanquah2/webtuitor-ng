import { Routes } from "@angular/router";
import { AdminComponent } from './admin/admin.component';
import { CoursePostComponent } from './course/course-post/course-post.component';
import { CourseComponent } from './course/course.component';
import { WebtuitorComponent } from './webtuitor/webtuitor.component';

export const appRoutes:Routes = [
    { path: 'home', component: WebtuitorComponent },
    { path: 'courses', component: CourseComponent },
    { path: 'course/post', component: CoursePostComponent },
    { path: 'admin', component: AdminComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
]
   