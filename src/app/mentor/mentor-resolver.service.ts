import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { MentorService } from "./mentor.service";
import { map } from "rxjs/operators";

@Injectable()
export class MentorResolver implements Resolve<any> {
    constructor( private mentorService: MentorService) {

    }
    resolve() {
        return this.mentorService.getMentors().pipe(map(mentors => mentors))
    }
}