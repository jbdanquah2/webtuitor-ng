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
import { HowtoComponent } from './webtuitor/nav-tabs/howto-tab.component';
import { EbookService } from './ebook/ebook.service';
import { EbookComponent } from './webtuitor/nav-tabs/ebook.component';

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
    EbookComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ Title,CourseService, HowtoService, EbookService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
