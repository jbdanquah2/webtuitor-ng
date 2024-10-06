import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {LoadingService} from '../../services/loading.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  name: any;
  password: any;
  email: any;

  constructor(
    private route: Router,
    private authService: AuthService,
    private cookieService: CookieService,
    private loadingService: LoadingService
  ) {
  }


  async signUp(value: any) {

    this.loadingService.startLoading();

    console.log('Signing up user: ', value);

    const token = await this.authService.createUser(value);

    console.log('#Token: ', token);

    if (token) {
      console.log('Signup successful, setting cookie, ');

      this.cookieService.set('current_user', JSON.stringify({access_token: token}), this.authService.expires, '/', '', this.authService.isSecure);

      await this.route.navigate(['/home']);

    } else {

      console.log('Signup failed, deleting cookie, ');

      this.cookieService.delete('current_user', '/', '');

      await this.route.navigate(['/auth/user/signup']);

    }
  }

  cancel() {

  }
}
