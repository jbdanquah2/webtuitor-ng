import { Routes } from "@angular/router";
import { EbookPostComponent } from "./ebook-post/ebook-post.component";
import { EbookRouteActivator } from "./ebook-post/ebook-route-activator.service";
import { EbookComponent } from "./ebook.component";

export const ebookRoutes:Routes = [
    { path: 'ebooks', component: EbookComponent},
    { path: 'ebooks/:link', component: EbookPostComponent, canActivate: [EbookRouteActivator]   }, 

]