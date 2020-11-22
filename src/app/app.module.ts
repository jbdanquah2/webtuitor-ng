import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { WebtuitorComponent } from './webtuitor/webtuitor.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { WebtuitorNavbarComponent } from './webtuitor/navbar/webtuitor-navbar.component';
import { BlogNavbarComponent } from './blog/navbar/blog-navbar.component';
import { BlogComponent } from './blog/blog.component';
import { BlogPostComponent } from './blog/blog-post/blog-post.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    WebtuitorComponent,
    WebtuitorNavbarComponent,
    BlogNavbarComponent,
    BlogComponent,
    BlogPostComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ Title ],
  bootstrap: [AppComponent]
})
export class AppModule { }
