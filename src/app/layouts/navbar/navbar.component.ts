import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "src/app/user/auth.service";
import {jwtDecode} from 'jwt-decode';

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: [`navbar.component.css`]
})
export class NavbarComponent implements OnInit {

    currentUser:string
    password:string
    checkCookie:boolean

    constructor(
      public authService: AuthService,
      private cookieService: CookieService,
      private router: Router) {

    }
    ngOnInit() {

      this.checkCookie = this.cookieService.check('current_user');

      console.log('checking cookie: ', this.checkCookie);

      if (this.checkCookie) {

          const cookie = this.cookieService.get('current_user');
          const cookieObj = JSON.parse(cookie);
          const decodedToken: any = jwtDecode(cookieObj.access_token);

          console.log('Decoded token: ', decodedToken);

          this.authService.currentUser = {
            id: decodedToken.id,
            name: decodedToken.name,
            email: decodedToken.email,
            password: cookieObj.access_token
          }

          this.authService.setAuthentication(true);

      } else {

        console.log('No cookie found, checking authentication');

        this.authService.setAuthentication(false);

      }
    }
    async logout(state) {

        this.authService.setAuthentication(state);

        this.cookieService.deleteAll('/','localhost');

        await this.router.navigateByUrl('/auth/user/login');

        window.scrollTo(0,0);
    }

}
