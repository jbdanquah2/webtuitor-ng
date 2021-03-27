import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "src/app/user/auth.service";

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: [`navbar.component.css`]
})
export class NavbarComponent implements OnInit {
    currentUser:string
    password:string
    checkCookie:boolean
    constructor(public authService: AuthService, private cookieService: CookieService, private router: Router) {
        this.checkCookie = this.cookieService.check('currentUser');
    }
    ngOnInit() {
      
        if (this.checkCookie) {
            this.currentUser = this.cookieService.get('currentUser');
            this.authService.loginUser(JSON.parse(this.currentUser).userName,JSON.parse(this.currentUser).password)             
        }
    }
    logout(state) {
        this.authService.checkAuthentication(state);
        this.cookieService.deleteAll('/','localhost');
        this.router.navigate(['auth/user/login'])
        window.scrollTo(0,0);
    }
 
}