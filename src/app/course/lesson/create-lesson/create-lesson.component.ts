import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LessonService} from '../lesson.service';
import {Router} from '@angular/router';

@Component({
  selector: 'create-lesson',
  templateUrl: './create-lesson.component.html',
  styleUrls: ['./create-lesson.component.css']
})
export class CreateLessonComponent implements OnInit {

  createLessonForm: FormGroup;
  imgPreview: string | ArrayBuffer = '';
  selectedFile: File | null = null;


  constructor(private fb: FormBuilder,
              private lessonService: LessonService,
              private router: Router) {

  }

  ngOnInit() {

    this.createLessonForm = this.fb.group({
      title: ['', Validators.required],
      summary: ['', Validators.required],
      content: ['', Validators.required],
      url: ['', Validators.required],
      file: [null],
      isPublished: [false, Validators.required]
    });

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

  async submitCourse($event: MouseEvent) {


    event.preventDefault();

    if (this.createLessonForm.invalid) {
      console.log('Invalid form');
      return;
    }

    const result = await this.lessonService.createLesson(this.createLessonForm.value, this.selectedFile);
    console.log('Result', result);

    this.createLessonForm.reset();



    this.imgPreview = '';
    this.selectedFile = null;

    this.router.navigate(['/learn/courses/']);

  }

  cancel() {

  }
}
