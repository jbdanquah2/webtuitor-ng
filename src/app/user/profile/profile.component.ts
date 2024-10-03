import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "../auth.service";

@Component({
    templateUrl: 'profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    profileForm: FormGroup
    name: FormControl
    email: FormControl
    password: FormControl
    confirmPassword: FormControl
    mouseoverLogin

  private jwt_token: string;

    constructor(
      private router: Router,
      private authService: AuthService,
      private cookieService: CookieService) {

    }
    ngOnInit() {

      const checkCookie = this.cookieService.check('current_user')

      if (checkCookie) {
        const cookie = this.cookieService.get('current_user');

        this.jwt_token = JSON.parse(cookie).access_token;

      }

        this.profileForm = new FormGroup({
            name: new FormControl(this.authService.currentUser.name, Validators.required),
            email: new FormControl(this.authService.currentUser.email, Validators.required),
            password: new FormControl("", Validators.required),
            // confirmPassword: new FormControl("", Validators.required)
        })
    }

    async saveProfile(formValues: any) {

        const token = await this.authService.updateCurrentUser(formValues.name, formValues.email, formValues.password, this.jwt_token);

      if (token) {
        console.log('Profile saved successfully',   token);
        this.cookieService.set('current_user', JSON.stringify({access_token: token}), this.authService.expires, '/', '', this.authService.isSecure);

        await this.router.navigate(['/home']);

        } else {
            console.log('Profile save failed', token);
        }

        window.scrollTo(0, 0);
    }

    cancelEdit() {
        this.router.navigate(['/home'])
        window.scrollTo(0, 0)
    }
}
