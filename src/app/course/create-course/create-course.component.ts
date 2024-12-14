import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CourseService} from '../course.service';
import {Router} from '@angular/router';

@Component({
  selector: 'create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {
  imgPreview: string | ArrayBuffer = '';
  createCourseForm: FormGroup;
  selectedFile: File | null = null;
  levels = ['Beginner', 'Intermediate', 'Advanced'];

  constructor(private fb: FormBuilder,
              private courseService: CourseService,
              private router: Router) {

  }

  ngOnInit() {

    this.createCourseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      url: ['', Validators.required],
      level: ['', Validators.required],
      file: [null],
      tags: ['', Validators.required],
      totalTime: ['', Validators.required],
      content: ['', Validators.required]
    });

  }

  cancel() {

  }

  async submitCourse($event: MouseEvent) {

    event.preventDefault();

    if (this.createCourseForm.invalid) {
      console.log('Invalid form');
      return;
    }

    const result = await this.courseService.createCourse(this.createCourseForm.value, this.selectedFile);
    console.log('Result', result);

    this.createCourseForm.reset();



    this.imgPreview = '';
    this.selectedFile = null;

    this.router.navigate(['/learn/courses/']);



  }

  onFileSelected(event: any) {

    console.log('Event', event);

    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imgPreview = reader.result;
      }
      reader.readAsDataURL(this.selectedFile);

    }

  }
}
