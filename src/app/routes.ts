import { Routes } from "@angular/router";
import { AdminComponent } from './admin/admin.component';
import { Error404Component } from './errors/404.component';
import { WebtuitorComponent } from './webtuitor/webtuitor.component';

export const appRoutes: Routes = [
  { path: 'home', component: WebtuitorComponent },
  { path: 'admin', component: AdminComponent },
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'us', loadChildren: () => import('src/app/about/about.module').then(m => m.AboutModule) },
  { path: 'learn', loadChildren: () => import('src/app/course/course.module').then(m => m.CourseModule) },
  { path: 'read', loadChildren: () => import('src/app/ebook/ebook.module').then(m => m.EbookModule) },
  { path: 'quick', loadChildren: () => import('src/app/howto/howto.module').then(m => m.HowtoModule) },
  { path: 'guidance', loadChildren: () => import('src/app/mentor/mentor.module').then(m => m.MentorModule) },
  { path: 'auth', loadChildren: () => import('src/app/user/user.module').then(m => m.UserModule) }
];
