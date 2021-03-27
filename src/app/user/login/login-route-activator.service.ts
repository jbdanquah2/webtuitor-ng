// import { Route } from '@angular/compiler/src/core';
import { Injectable } from "@angular/core";
import { Router, CanActivate } from '@angular/router';
import { AuthService } from "../auth.service";

@Injectable()
export class LoginRouteActivator implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {

    }
    canActivate() {
        const authenticated = this.authService.isAuthenticated
        if (authenticated)
            this.router.navigate(['home'])
        return !authenticated;
    }
}