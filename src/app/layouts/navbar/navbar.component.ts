import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "src/app/user/auth.service";

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: [`navbar.component.css`]
})
export class NavbarComponent implements OnInit {
    userName:string
    password:string
    checkCookie:boolean
    constructor(public authService: AuthService, private cookieService: CookieService) {
        this.checkCookie = this.cookieService.check('userName');
    }
    ngOnInit() {
      
        if (this.checkCookie) {
            this.userName = this.cookieService.get('userName');
            this.password = this.cookieService.get('password');
            this.authService.loginUser(this.userName,this.password)             
        }
    }
    logout(state) {
        this.authService.checkAuthentication(state);
        this.cookieService.deleteAll('/','localhost');
    }
 
}