import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { CourseService } from '../course.service';

@Injectable()
export class CourseRouteActivator implements CanActivate {
    constructor(private courseService: CourseService, private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot) {
        const courseExist = !!this.courseService.getCourse(route.params['link'])

        if (!courseExist)
            this.router.navigate(['404'])
        return courseExist
    }
}
