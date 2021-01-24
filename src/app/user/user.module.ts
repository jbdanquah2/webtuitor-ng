import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { userRoutes } from "./user.routes";
import { LoginComponent } from "./login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfileComponent } from "./profile/profile.component";

@NgModule({
   imports: [
       CommonModule,
       FormsModule,
       ReactiveFormsModule,
       RouterModule.forChild(userRoutes)

   ],
   declarations: [
        LoginComponent,
        ProfileComponent
   ],
   providers: [
   ]
})
export class UserModule {

}