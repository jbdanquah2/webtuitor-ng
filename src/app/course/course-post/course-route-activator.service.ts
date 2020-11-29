import { Route } from '@angular/compiler/src/core';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { CourseService } from '../course.service';

@Injectable()
export class CourseRouteActivator implements CanActivate {
    constructor(private courseService: CourseService, private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot) {
        const courseExist = !!this.courseService.getCourse(route.params['id'])

        if (!courseExist)
            this.router.navigate(['404'])
        return courseExist
    }
}