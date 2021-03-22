import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { CookieService } from "ngx-cookie-service";
import { expressionType } from "@angular/compiler/src/output/output_ast";

@Component({
    templateUrl: 'login.component.html',
    styleUrls: [`login.component.css`]

})
export class LoginComponent {
    mouseoverLogin
    userName: any
    password:any
    cookieValue: any
    constructor(private route: Router, private authservice: AuthService, 
        private cookieService:CookieService ) {
    }


    login(formValues) {
        let domain = 'webtuitor.herokuapp.com/';
        let path ='/';
        let secure = true;
        let oldDate = new Date()
        let expiry = new Date();
        
        expiry.setTime(oldDate.getTime() + (30 * 60 * 1000))
        // expiry.setDate(expiry.getDate() + 1);

        this.authservice.loginUser(formValues.userName, formValues.password);
        this.cookieService.set('userName', formValues.userName, expiry, path, domain,secure,'None');
        this.cookieService.set('password', formValues.password, expiry, path, domain,secure,'None');

        console.log('login is called!: ', formValues.userName);
        
        this.route.navigate(['/home'])
        
    }
    ngOnInit() {
        if (this.cookieService.check('userName')) { 
            console.log(this.cookieService.get('userName'));
            
        }
    }
    
    cancel() {
        this.route.navigate(['/home']);
    }

}