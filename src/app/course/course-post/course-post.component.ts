import {Component, Input, OnInit} from '@angular/core';
import { CourseService } from '../course.service';
import { ActivatedRoute } from "@angular/router";
import { StringService } from "src/app/services/string.service";
import {capitalizeFirstLetter} from '../../../../rest-api/src/utils/string.utils';

@Component({
    selector:'course-post',
    templateUrl:'course-post.component.html',
    styles:[`

    `]
})
export class CoursePostComponent implements OnInit {
    course:any

    constructor(private courseService: CourseService,
                private route: ActivatedRoute) {

    }
    async ngOnInit(){
      const data = this.route.snapshot.data['courseData'];
      this.course = data.course;
      console.log('Course', this.course);

    }

    capitalizeFirstLetter(str: string) {
        return capitalizeFirstLetter(str)
    }
}
