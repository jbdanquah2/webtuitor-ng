import { Component } from '@angular/core';
import {AuthService} from '../../../user/auth.service';
import {CourseService} from '../../course.service';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent {

  constructor(private authService: AuthService,
              private courseService: CourseService) {
  }

}
