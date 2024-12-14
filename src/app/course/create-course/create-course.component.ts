import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {
  imgPreview: string | ArrayBuffer = '';
  createCourseForm: FormGroup;
  relatedCourses: any;
  categories: string[]

  constructor(private fb: FormBuilder ) {

  }

  ngOnInit() {

    this.createCourseForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      url: [''],
      category: [''],
      related: [''],
      file: [null],
      tags: [''],
      totalTime: [''],
      content: ['']
    });

  }

  cancel() {

  }

  submitCourse($event: MouseEvent) {

  }

  onFileSelected($event: Event) {

  }
}
