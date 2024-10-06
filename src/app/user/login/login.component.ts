import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { CookieService } from "ngx-cookie-service";
import {LoadingService} from '../../services/loading.service';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: [`login.component.css`]

})
export class LoginComponent {


    email: any

    password:any

    constructor(
      private route: Router,
      private authservice: AuthService,
      private cookieService:CookieService,
      private loadingService: LoadingService) {
    }


    async login(formValues: any) {

      this.loadingService.startLoading();

      console.log('Logging in user: ', formValues);

       const token = await this.authservice.loginUser(formValues.email, formValues.password);

       console.log('#Token: ', token);

        if (token) {
            console.log('Login successful, setting cookie, ');

            this.cookieService.set('current_user', JSON.stringify({access_token: token}), this.authservice.expires, '/', '', this.authservice.isSecure);

            await this.route.navigate(['/home']);

        } else {

          console.log('Login failed, deleting cookie, ');

          this.cookieService.delete('current_user', '/', '');

          await this.route.navigate(['/auth/user/login']);

        }

        this.loadingService.stopLoading();

    }

    cancel() {

        this.route.navigate(['/home']);
    }

}
