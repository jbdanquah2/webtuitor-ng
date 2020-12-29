import { Routes } from "@angular/router";
import { AdminComponent } from './admin/admin.component';
import { Error404Component } from './errors/404.component';
import { WebtuitorComponent } from './webtuitor/webtuitor.component';
import { MentorComponent } from './mentor/mentor.component';
import { MentorPageComponent } from './mentor/mentor-page/mentor-page.component';


export const appRoutes:Routes = [
    { path: 'home', component: WebtuitorComponent },
    { path: 'admin', component: AdminComponent },
    { path: '404', component: Error404Component },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'us', loadChildren: 'src/app/about/about.module#AboutModule' },
    { path: 'learn', loadChildren: 'src/app/course/course.module#CourseModule' },
    { path: 'read', loadChildren: 'src/app/ebook/ebook.module#EbookModule' },
    { path: 'quick', loadChildren: 'src/app/howto/howto.module#HowtoModule' },
    { path: 'guidance', loadChildren: 'src/app/mentor/mentor.module#MentorModule' },
    { path: 'auth', loadChildren: 'src/app/user/user.module#UserModule' }
]
   