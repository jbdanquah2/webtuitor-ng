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
    firstName: FormControl
    lastName: FormControl
    userName: FormControl
    password: FormControl
    confirmPassword: FormControl
    mouseoverLogin

    constructor(private router: Router, private authService: AuthService, private cookieService: CookieService) {

    }
    ngOnInit() {
        // this.firstName = new FormControl(this.authService.currentUser.firstName, Validators.required)
        // this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required)
        // this.userName = new FormControl(this.authService.currentUser.userName, Validators.required)
        // this.password = new FormControl(this.authService.currentUser.password, Validators.required)
        // // this.confirmPassword = new FormControl('', Validators.required)

        this.profileForm = new FormGroup({
            firstName: new FormControl(this.authService.currentUser.firstName, Validators.required),
            lastName: new FormControl(this.authService.currentUser.lastName, Validators.required),
            userName: new FormControl(this.authService.currentUser.userName, Validators.required),
            password: new FormControl(this.authService.currentUser.password, Validators.required),
            confirmPassword: new FormControl(this.authService.currentUser.password, Validators.required)
        })
    }
    saveProfile(formValues) {
        // console.log(formValues)
        // let domain = 'localhost';
        let path = '/';
        let secure = true;
        let oldDate = new Date()
        let expiry = new Date();

        expiry.setTime(oldDate.getTime() + (30 * 60 * 1000))

        this.cookieService.set('currentUser', JSON.stringify(this.authService.currentUser), expiry, path, '', secure, 'None');
        this.cookieService.set('token', JSON.stringify(this.authService.currentUser.password), expiry, path, '', secure, 'None');

        this.authService.updateCurrentUser(formValues.firstName, formValues.lastName,
            formValues.userName, formValues.password)
        this.router.navigate(['/home'])
        window.scrollTo(0, 0)
    }

    cancelEdit() {
        this.router.navigate(['/home'])
        window.scrollTo(0, 0)
    }
}