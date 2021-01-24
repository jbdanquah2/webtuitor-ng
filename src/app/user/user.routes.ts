import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";

export const userRoutes:Routes = [
    { path: 'user/login', component: LoginComponent },
    { path: 'user/profile', component:ProfileComponent}
]