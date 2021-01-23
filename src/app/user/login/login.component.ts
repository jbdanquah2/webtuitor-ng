import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
    templateUrl: 'login.component.html',
    styleUrls: [`login.component.css`]

})
export class LoginComponent {
    mouseoverLogin 
    userName 
    password
    

    constructor( private route: Router, private authservice: AuthService) {

    }

    login(formValues) {
        this.authservice.loginUser(formValues.userName, formValues.password);
        this.route.navigate(['/home'])
    }


    cancel() {
        this.route.navigate(['/home']);
    }

}