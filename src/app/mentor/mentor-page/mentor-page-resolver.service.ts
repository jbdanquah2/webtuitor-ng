import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { map } from "rxjs/operators";
import { MentorService } from "../mentor.service";

@Injectable()
export class MentorPageResolver implements Resolve<any> {
    constructor( private mentorService: MentorService) {

    }
    resolve(route:ActivatedRouteSnapshot) {
        return this.mentorService.getMentor(route.params['login']).pipe(map(mentor => mentor))
    }
}