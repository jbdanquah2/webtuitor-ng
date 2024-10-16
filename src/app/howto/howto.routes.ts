import { Routes } from "@angular/router";
import { HowtoPostComponent } from "./howto-post/howto-post.component";
import { HowtoRouteActivator } from "./howto-post/howto-route-activator.service";
import { HowtoComponent } from "./howto.component";
import {HowtoListComponent} from './howto-list/howto-list.component';
import {CreateHowtoComponent} from './create-howto/create-howto.component';

export const howtoRoutes:Routes = [
    { path: 'howtos', component: HowtoListComponent },
    { path: 'howtos/create', component: CreateHowtoComponent },
    { path: 'howtos/:link', component: HowtoPostComponent, canActivate: [HowtoRouteActivator]  },
    { path: 'howtos/related/:link', component: HowtoPostComponent, canActivate: [HowtoRouteActivator]},
]
