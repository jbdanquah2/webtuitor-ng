import {Component, Input, OnInit} from '@angular/core';
import { CourseService } from '../course.service';
import {ActivatedRoute, Router} from '@angular/router';
import {capitalizeFirstLetter} from '../../../../rest-api/src/utils/string.utils';
import {AuthService} from '../../user/auth.service';

@Component({
    selector:'course-post',
    templateUrl:'course-post.component.html',
    styles:[`

    `]
})
export class CoursePostComponent implements OnInit {

  @Input()
  course:any

  isAuthenticated: boolean = this.authService.isAuthenticated;

  lessons: any[] = [];

    constructor(private authService: AuthService,
                private router: Router) {

    }
    async ngOnInit(){

      this.lessons = this.course?.lessons
      console.log('Course', this.course);

    }

    capitalizeFirstLetter(str: string) {
        return capitalizeFirstLetter(str)
    }

}
