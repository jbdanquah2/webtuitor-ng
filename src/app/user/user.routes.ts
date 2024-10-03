import { Routes } from "@angular/router";
import { LoginRouteActivator } from "./login/login-route-activator.service";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";

export const userRoutes:Routes = [
    { path: 'user/login', component: LoginComponent, canActivate:[LoginRouteActivator] },
    { path: 'user/profile', component:ProfileComponent}
]
