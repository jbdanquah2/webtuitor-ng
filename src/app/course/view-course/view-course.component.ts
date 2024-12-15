import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {

  course: any;
  lessons: any[] = [];
  lesson: any;
  lessonId: number;
  paramCount: number = 0;

  constructor(private route:ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    const data = this.route.snapshot.data['courseData'];
    this.course = data.course;

    this.route.paramMap.subscribe((params) => {

      this.paramCount = params.keys.length;

      this.lessonId = +this.route.snapshot.params?.lessonId;

      this.lessons = this.course?.lessons;

      this.lesson = this.course?.lessons.find((lesson: any) => lesson.id === +this.lessonId);

      console.log('Lesson', this.lesson);

    });
  }


}
