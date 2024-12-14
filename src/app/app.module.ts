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
import { StringService } from './services/string.service';
import { MentorService } from './mentor/mentor.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MentorResolver } from './mentor/mentor-resolver.service';
import { MentorPageResolver } from './mentor/mentor-page/mentor-page-resolver.service';
import { AuthService } from './user/auth.service';
import { CookieService } from 'ngx-cookie-service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoadingComponent } from './shared/loading/loading.component';
import {LoadingInterceptor} from './interceptors/loading.interceptor';
import {JwtInterceptorService} from './services/jwt-interceptor.service';
import {QuillModule} from 'ngx-quill';
import { CreateCourseComponent } from './course/create-course/create-course.component';


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
    Error404Component,
    LoadingComponent,
    CreateCourseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    QuillModule.forRoot(),
    ReactiveFormsModule,

  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    Title,CourseService,
    CookieService,
    HowtoService,
    EbookService,
    CourseRouteActivator,
    EbookRouteActivator,
    StringService,
    MentorService,
    MentorResolver,
    MentorPageResolver,
    AuthService],
  bootstrap: [AppComponent],
})
export class AppModule { }
