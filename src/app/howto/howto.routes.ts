import { Routes } from "@angular/router";
import { HowtoPostComponent } from "./howto-post/howto-post.component";
import { AuthGuard } from "../services/auth-guard";
import {HowtoListComponent} from './howto-list/howto-list.component';
import {CreateHowtoComponent} from './create-howto/create-howto.component';
import {howtoResolver} from './howto.resolver';
import * as path from 'path';
import {EditHowtoComponent} from './edit-howto/edit-howto.component';

export const howtoRoutes:Routes = [
    { path: 'howtos', component: HowtoListComponent },
    { path: 'howtos/create', component: CreateHowtoComponent, canActivate: [AuthGuard] },
    { path: 'howtos/:id', component: HowtoPostComponent, resolve: {howtoData: howtoResolver}},
    { path: 'howtos/related/:id', component: HowtoPostComponent, resolve: {howtoData: howtoResolver}},
    { path: 'howtos/edit/:id', component: EditHowtoComponent, resolve: {howtoData: howtoResolver}, canActivate: [AuthGuard] }
]
