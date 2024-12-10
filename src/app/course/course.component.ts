import { Component, Input } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { CourseService } from './course.service';
import { StringService } from 'src/app/services/string.service'
import {capitalizeFirstLetter, concatString} from '../../../rest-api/src/utils/string.utils';

@Component({
    selector:'app-course',
    templateUrl:'course.component.html',
    styleUrls:['course.component.css','../shared-css/page-css.css']
})
export class CourseComponent {
    courses:any
    constructor(private courseService: CourseService,
                private route: ActivatedRoute) {

    }

    ngOnInit(id){
        this.courses = this.courseService.getCourses()
        window.scrollTo(0,0);
    }

  protected readonly capitalizeFirstLetter = capitalizeFirstLetter;
  protected readonly concatString = concatString;
}
