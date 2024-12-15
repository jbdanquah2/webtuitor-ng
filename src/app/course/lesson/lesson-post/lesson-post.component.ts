import {Component, Input, OnInit} from '@angular/core';
import {LessonService} from '../lesson.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../user/auth.service';
import {capitalizeFirstLetter} from '../../../../../rest-api/src/utils/string.utils';
import {CourseService} from '../../course.service';

@Component({
  selector: 'lesson-post',
  templateUrl: './lesson-post.component.html',
  styleUrls: ['./lesson-post.component.css']
})
export class LessonPostComponent implements OnInit {

  @Input()
  course: any = null;

  @Input()
  lesson: any = null;


  isAuthenticated: boolean = this.authService.isAuthenticated;


  constructor(private authService: AuthService) {
  }

  async ngOnInit() {

    console.log('<<<Course', this.course);
    console.log('<<<Lesson', this.lesson);


  }

  addLesson() {

  }

  capitalizeFirstLetter(str: string) {
    return capitalizeFirstLetter(str)
  }
}
