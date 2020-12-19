import { Route } from '@angular/compiler/src/core';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { HowtoService } from '../howto.service';

@Injectable()
export class HowtoRouteActivator implements CanActivate {
    constructor(private howtoService: HowtoService, private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot) {
        const howtoExist = !!this.howtoService.getHowto(route.params['link'])

        if (!howtoExist)
            this.router.navigate(['404'])
        return howtoExist
    }
}