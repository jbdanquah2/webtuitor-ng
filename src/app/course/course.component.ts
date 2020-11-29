import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { CourseService } from './course.service';

@Component({
    selector:'app-course',
    templateUrl:'course.component.html',
    styleUrls:['course.component.css']
})
export class CourseComponent {
    courses:any
    constructor(private courseService: CourseService, private route: ActivatedRoute) {

    }
    ngOnInit(id){
        this.courses = this.courseService.getCourses()
        console.log(this.courses);
        
    }
}