import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "src/app/user/auth.service";

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: [`navbar.component.css`]
})
export class NavbarComponent implements OnInit {
    constructor(public authService: AuthService, private cookieService: CookieService) {

    }
    ngOnInit() {
        if (this.cookieService.check('userName')) {
            const userNames = this.cookieService.get('userName');
            const passwords = this.cookieService.get('password');
            this.authService.loginUser(userNames,passwords)
             
            this.authService.isAuthenticated = true;  
        }
    }
    logout() {
        this.cookieService.deleteAll()
        this.authService.isAuthenticated = false;
        
        
    }
 
}