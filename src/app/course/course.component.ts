import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
              private router: Router,
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

    this.router.navigateByUrl(`/learn/courses/edit/${this.course.id}`);

  }

  async deleteCourse() {


    const result = confirm('Are you sure you want to delete this how-to?');

    if (!result) {
      return;
    }

    await this.courseService.deleteCourse(this.course.id);

    this.deletedCourse.emit(this.course);

  }
}
