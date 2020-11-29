import { Routes } from "@angular/router";
import { AdminComponent } from './admin/admin.component';
import { CoursePostComponent } from './course/course-post/course-post.component';
import { CourseRouteActivator } from './course/course-post/course-route-activator.service';
import { CourseComponent } from './course/course.component';
import { Error404Component } from './errors/404.component';
import { EbookComponent } from './webtuitor/nav-tabs/ebook.component';
import { HowtoComponent } from './webtuitor/nav-tabs/howto-tab.component';
import { WebtuitorComponent } from './webtuitor/webtuitor.component';


export const appRoutes:Routes = [
    { path: 'home', component: WebtuitorComponent },
    { path: 'courses', component: CourseComponent },
    { path: 'course/:id', component: CoursePostComponent, canActivate: [CourseRouteActivator] },
    { path: 'howto/:id', component: HowtoComponent },
    { path: 'ebook/:id', component: EbookComponent },
    { path: 'admin', component: AdminComponent },
    { path: '404', component: Error404Component },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
]
   