import { Routes } from "@angular/router";
import { AdminComponent } from './admin/admin.component';
import { BlogPostComponent } from './blog/blog-post/blog-post.component';
import { BlogComponent } from './blog/blog.component';
import { WebtuitorComponent } from './webtuitor/webtuitor.component';

export const appRoutes:Routes = [
    { path: 'home', component: WebtuitorComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'blog/post', component: BlogPostComponent },
    { path: 'admin', component: AdminComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
]
   