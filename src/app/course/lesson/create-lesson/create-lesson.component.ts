import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LessonService} from '../lesson.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../course.service';

@Component({
  selector: 'create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})
export class CreateLessonComponent implements OnInit {

  createLessonForm: FormGroup;
  imgPreview: string | ArrayBuffer = '';
  selectedFile: File | null = null;
  course: any;
  courseId: number;


  constructor(private fb: FormBuilder,
              private lessonService: LessonService,
              private courseService: CourseService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit() {

    this.route.data.subscribe(async (data) => {

      this.course = data.courseData?.course;
      this.courseId = this.course?.id;

      this.createLessonForm = this.fb.group({
        title: ['', Validators.required],
        summary: ['', Validators.required],
        content: ['', Validators.required],
        url: ['', Validators.required],
        file: [null],
        isPublished: [false]
      });
    })
  }

  onFileSelected(event: any) {

    console.log('Event..', event);

    if (event.target.files.length > 0) {

      this.selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imgPreview = reader.result;
      }
      reader.readAsDataURL(this.selectedFile);

    }

  }

  async submitLesson(event: MouseEvent) {
    event.preventDefault();

    if (this.createLessonForm.invalid) {
      console.log('Invalid form');
      return;
    }

    const result = await this.lessonService.createLesson(this.createLessonForm.value, this.selectedFile, this.course.id);
    console.log('!!!Result', result);

    this.courseService.courses.find((course: any) => {
      if (course.id === this.course.id) {
        course.lessons.push(result);
      }
    });

    this.createLessonForm.reset();

    this.imgPreview = '';
    this.selectedFile = null;

    this.router.navigate(['/learn/courses/', this.course.id]);

  }

  cancel() {

  }
}
