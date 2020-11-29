import { Component } from "@angular/core";
import { CourseService } from '../../course/course.service';

@Component({
    selector: 'course-tab',
    template: `
    <div class="card-group">
        <div *ngFor="let course of courses" class="card">
        <img heigt="200" class="card-img-top" [src]="course.img" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">{{course.name}}</h5>
            <p class="card-text">{{trimDesc(course.description, 100)}}</p>
            <button class="btn btn-md btn-outline-info">Start</button>
            <p class="card-text">
                <span><small class="text-muted">{{course.published}}</small></span>&nbsp;&nbsp;&nbsp;
                <span class="text-right"><small class="text-muted">{{course.totalTime}}</small></span>
        </p>
        </div>
        </div>
    </div>`,
    styleUrls: ['nav-tab.component.css']
})
export class CourseTabComponent {
    courses: any
    constructor(private courseService: CourseService) {

    }
    ngOnInit() {
        this.courses = this.courseService.getCourses();
    }
    
    trimDesc(s,n) {
        var cut= s.indexOf(' ', n);
        if(cut== -1) return s;
        return s.substring(0, cut)+'...'
    }
    

}