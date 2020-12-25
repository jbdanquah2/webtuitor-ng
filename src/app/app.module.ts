import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { WebtuitorComponent } from './webtuitor/webtuitor.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { CourseComponent } from './course/course.component';
import { CoursePostComponent } from './course/course-post/course-post.component';
import { AdminComponent } from './admin/admin.component';
import { AdminSidebarComponent } from './layouts/admin/admin-sidebar.component';
import { CourseTabComponent } from './webtuitor/nav-tabs/courses-tab.component';
import { CourseService } from './course/course.service';
import { HowtoService } from './howto/howto.service';
import { HowtoComponent } from './howto/howto.component';
import { EbookService } from './ebook/ebook.service';
import { EbookTabComponent } from './webtuitor/nav-tabs/ebook-tab.component';
import { Error404Component } from './errors/404.component';
import { CourseRouteActivator } from './course/course-post/course-route-activator.service';
import { EbookPostComponent } from './ebook/ebook-post/ebook-post.component';
import { HowtoPostComponent } from './howto/howto-post/howto-post.component';
import { EbookComponent } from './ebook/ebook.component';
import { HowtoTabComponent } from './webtuitor/nav-tabs/howto-tab.component';
import { EbookRouteActivator } from './ebook/ebook-post/ebook-route-activator.service';
import { HowtoRouteActivator } from './howto/howto-post/howto-route-activator.service';
import { StringService } from './untility/string.service';
import { MentorComponent } from './mentor/mentor.component';
import { MentorService } from './mentor/mentor.service';
import { AboutComponent } from './about/about.component';
import { MentorPageComponent } from './mentor/mentor-page/mentor-page.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    WebtuitorComponent,
    CourseComponent,
    CoursePostComponent,
    AdminComponent,
    AdminSidebarComponent,
    CourseTabComponent,
    HowtoComponent,
    HowtoPostComponent,
    HowtoTabComponent,
    EbookComponent,
    EbookPostComponent,
    EbookTabComponent,
    Error404Component,
    MentorComponent,
    AboutComponent,
    MentorPageComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ Title,CourseService, HowtoService, EbookService, CourseRouteActivator, EbookRouteActivator, 
    HowtoRouteActivator, StringService, MentorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
