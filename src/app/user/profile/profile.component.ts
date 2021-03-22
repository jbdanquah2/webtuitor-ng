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

    constructor(private router: Router, private authService: AuthService, private cookieService:CookieService) {

    }
    ngOnInit() {
        this.firstName = new FormControl(this.authService.currentUser.firstName, Validators.required)
        this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required)
        this.userName = new FormControl(this.authService.currentUser.userName, Validators.required)
        this.password = new FormControl(this.authService.currentUser.password, Validators.required)
        // this.confirmPassword = new FormControl('', Validators.required)

        this.profileForm = new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName,
            userName: this.userName,
            password: this.password,
            confirmPassword: this.password
        })
    }
    saveProfile(formValues) {
        // console.log(formValues)
        // let domain = 'localhost';
        let path ='/';
        let secure = true;
        let oldDate = new Date()
        let expiry = new Date();
        
        expiry.setTime(oldDate.getTime() + (30 * 60 * 1000))
        
        this.cookieService.set('userName', formValues.userName, expiry, path,'',secure,'None');
        this.cookieService.set('password', formValues.password, expiry, path,'',secure,'None');

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