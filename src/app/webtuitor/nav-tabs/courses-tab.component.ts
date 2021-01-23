import { Component } from "@angular/core";
import { StringService } from "src/app/untility/string.service";
import { CourseService } from '../../course/course.service';

@Component({
    selector: 'course-tab',
    template: `
    <div class="card-group">
        <div [routerLink]="['/learn/courses/',course.link]" *ngFor="let course of courses | slice:0:4; let i=index" class="card">
        <img heigt="200" class="card-img-top" [src]="course.img" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">{{concStr.capitalizeFirstLetter(course.name)}}</h5>
            <p class="card-text">{{trimDesc(course.description, 100)}}</p>
            <button [routerLink]="['/learn/courses/',course.link]" class="btn btn-md btn-outline-info">Start</button>
            <p class="card-text">
                <!-- <span><small class="text-muted">{{course.published}}</small></span>&nbsp;&nbsp;&nbsp; -->
                <!-- <span class="text-right"><small class="text-muted">{{course.totalTime}}</small></span> -->
        </p>
        </div>
        </div>
    </div>`,
    styleUrls: ['nav-tab.component.css']
})
export class CourseTabComponent {
    courses: any
    concStr:any
    constructor(private courseService: CourseService, private stringService:StringService) {

    }
    ngOnInit() {
        this.courses = this.courseService.getCourses();
        this.concStr = this.stringService
    }
    
    trimDesc(s,n) {
        var cut= s.indexOf(' ', n);
        if(cut== -1) return s;
        return s.substring(0, cut)+'...'
    }
    

}