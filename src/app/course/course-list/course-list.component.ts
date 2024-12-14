import {Component, OnInit} from '@angular/core';
import {CourseService} from '../course.service';
import {AuthService} from '../../user/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: any
  isAuthenticated:boolean = this.authService.isAuthenticated;

  constructor(private courseService: CourseService,
              private authService: AuthService,
              private router: Router) {
  }

  async ngOnInit() {

    this.courses = await this.courseService.getCourses()
    console.log('this.courses:',this.courses);

  }

  onDelete(deletedCourse: any) {

    console.log('deleted howto:', deletedCourse);
    this.courses = this.courses.filter((course:any) => course.id !== deletedCourse.id);

  }

  openCreateCourse() {

    if (!this.isAuthenticated) {
      alert('You must be logged in to create a how-to');
      return this.router.navigate(['/auth/login']);
    }
    this.router.navigate(['/learn/courses/create']);

  }
}
