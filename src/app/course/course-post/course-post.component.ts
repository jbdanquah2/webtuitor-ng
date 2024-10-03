import { Component, Input } from "@angular/core";
import { CourseService } from '../course.service';
import { ActivatedRoute } from "@angular/router";
import { StringService } from "src/app/services/string.service";

@Component({
    selector:'course-post',
    templateUrl:'course-post.component.html',
    styles:[`

    `]
})
export class CoursePostComponent {
    course:any
    @Input() strService:any
    constructor(private courseService: CourseService, private route: ActivatedRoute, private stringService:StringService) {

    }
    ngOnInit(){
        this.course = this.courseService.getCourse(this.route.snapshot.params['link'])
        this.strService = this.stringService
        window.scrollTo(0,0);
    }
}
