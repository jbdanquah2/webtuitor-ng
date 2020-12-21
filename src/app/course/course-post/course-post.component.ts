import { Component } from "@angular/core";
import { CourseService } from '../course.service';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector:'course-post',
    templateUrl:'course-post.component.html',
    styles:[`

    `]
})
export class CoursePostComponent {
    course:any
    constructor(private courseService: CourseService, private route: ActivatedRoute) {

    }
    ngOnInit(){
        this.course = this.courseService.getCourse(this.route.snapshot.params['link'])
        window.scrollTo(0,0);
    }
}