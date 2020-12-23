import { Component, Input } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { CourseService } from './course.service';
import { StringService } from 'src/app/untility/string.service'

@Component({
    selector:'app-course',
    templateUrl:'course.component.html',
    styleUrls:['course.component.css','../shared-css/page-css.css']
})
export class CourseComponent {
    courses:any
    @Input() strService:any
    constructor(private courseService: CourseService, private route: ActivatedRoute, private stringService: StringService) {

    }
    ngOnInit(id){
        this.courses = this.courseService.getCourses()
        this.strService = this.stringService
        window.scrollTo(0,0);
    }
}