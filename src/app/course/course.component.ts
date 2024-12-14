import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from './course.service';
import {capitalizeFirstLetter, concatString} from '../../../rest-api/src/utils/string.utils';
import {AuthService} from '../user/auth.service';

@Component({
    selector:'course',
    templateUrl:'course.component.html',
    styleUrls:['course.component.css','../shared-css/page-css.css']
})
export class CourseComponent implements OnInit {

  courses:any

  isAuthenticated: boolean = this.authService.isAuthenticated;

  @Input()
  course:any

  @Output()
  deletedCourse:EventEmitter<any> = new EventEmitter<any>();

  constructor(private courseService: CourseService,
              private route: ActivatedRoute,
              private authService: AuthService) {

  }

  ngOnInit (){



  }

  capitalizeFirstLetter(str: string) {
    return capitalizeFirstLetter(str)
  }

  concatString(string1: string, max: number) {
    return concatString(string1, max)
  }

  editCourse() {

  }

  deleteCourse() {

  }
}
