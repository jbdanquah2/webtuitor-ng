import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    templateUrl: 'login.component.html',
    styleUrls: [`login.component.css`]

})
export class LoginComponent {
    mouseoverLogin
    login 
    userName 
    password
    

    constructor( private route: Router) {

    }


    cancel() {
        this.route.navigate(['/home']);
    }

}