import { Routes } from "@angular/router";
import { AdminComponent } from './admin/admin.component';
import { CoursePostComponent } from './course/course-post/course-post.component';
import { CourseRouteActivator } from './course/course-post/course-route-activator.service';
import { CourseComponent } from './course/course.component';
import { EbookPostComponent } from './ebook/ebook-post/ebook-post.component';
import { EbookComponent } from './ebook/ebook.component';
import { Error404Component } from './errors/404.component';
import { HowtoPostComponent } from './howto/howto-post/howto-post.component';
import { EbookTabComponent } from './webtuitor/nav-tabs/ebook-tab.component';
import { HowtoComponent } from './howto/howto.component';
import { WebtuitorComponent } from './webtuitor/webtuitor.component';
import { EbookRouteActivator } from './ebook/ebook-post/ebook-route-activator.service';
import { HowtoRouteActivator } from './howto/howto-post/howto-route-activator.service';
import { MentorComponent } from './mentor/mentor.component';


export const appRoutes:Routes = [
    { path: 'home', component: WebtuitorComponent },
    { path: 'courses', component: CourseComponent },
    { path: 'courses/:link', component: CoursePostComponent, canActivate: [CourseRouteActivator]  },
    { path: 'howtos', component: HowtoComponent},
    { path: 'howtos/:link', component: HowtoPostComponent, canActivate: [HowtoRouteActivator]  },
    { path: 'howtos/related/:link', component: HowtoPostComponent, canActivate: [HowtoRouteActivator]  },
    { path: 'ebooks', component: EbookComponent},
    { path: 'ebooks/:link', component: EbookPostComponent, canActivate: [EbookRouteActivator]   }, 
    { path: 'mentors', component: MentorComponent },
    { path: 'admin', component: AdminComponent },
    { path: '404', component: Error404Component },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
]
   