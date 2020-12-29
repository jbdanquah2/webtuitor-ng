import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { WebtuitorComponent } from './webtuitor/webtuitor.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { AdminComponent } from './admin/admin.component';
import { AdminSidebarComponent } from './layouts/admin/admin-sidebar.component';
import { CourseTabComponent } from './webtuitor/nav-tabs/courses-tab.component';
import { CourseService } from './course/course.service';
import { HowtoService } from './howto/howto.service';
import { EbookService } from './ebook/ebook.service';
import { EbookTabComponent } from './webtuitor/nav-tabs/ebook-tab.component';
import { Error404Component } from './errors/404.component';
import { CourseRouteActivator } from './course/course-post/course-route-activator.service';
import { HowtoTabComponent } from './webtuitor/nav-tabs/howto-tab.component';
import { EbookRouteActivator } from './ebook/ebook-post/ebook-route-activator.service';
import { HowtoRouteActivator } from './howto/howto-post/howto-route-activator.service';
import { StringService } from './untility/string.service';
import { MentorService } from './mentor/mentor.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    WebtuitorComponent,
    AdminComponent,
    AdminSidebarComponent,
    CourseTabComponent,
    HowtoTabComponent,
    EbookTabComponent,
    Error404Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ Title,CourseService, HowtoService, EbookService, CourseRouteActivator, EbookRouteActivator, 
    HowtoRouteActivator, StringService, MentorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
