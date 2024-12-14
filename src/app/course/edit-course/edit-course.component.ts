import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CourseService} from '../course.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  editCourseForm: FormGroup;
  imgPreview: string | ArrayBuffer = '';
  selectedFile: File | null = null;
  levels: string[] = ['Beginner', 'Intermediate', 'Advanced'];
  course: any;

  constructor(private fb: FormBuilder,
              private courseService: CourseService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    this.route.data.subscribe(async (data) => {

      this.course = data.courseData?.course;
      this.imgPreview = this.course?.imageUrl;

      this.editCourseForm = this.fb.group({
        title: [this.course?.title, Validators.required],
        description: [this.course?.description, Validators.required],
        url: [this.course?.url, Validators.required],
        level: [this.course?.level || 'General', Validators.required],
        file: [null],
        tags: [this.course?.tags, Validators.required],
        totalTime: [this.course?.totalTime, Validators.required],
        content: [this.course?.content, Validators.required]
      });

    })
  }

  async saveHowto() {

    console.log('::Form', this.editCourseForm.value);

    if (this.editCourseForm.invalid) {
      console.log('Invalid form');
      return;
    }

    const result = await this.courseService.editCourse(this.course.id, this.editCourseForm.value, this.selectedFile);
    console.log('Result', result);

    this.editCourseForm.reset();
    this.editCourseForm.patchValue({
      level: ''
    });

    this.imgPreview = '';
    this.selectedFile = null;

    await this.router.navigate(['/learn/courses/']);

  }

  onFileSelected(event: any) {
    console.log('Event..', event);

    if (event.target.files.length > 0) {

      this.selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imgPreview = reader.result;
      }
      console.log('Selected file', this.selectedFile);

      reader.readAsDataURL(this.selectedFile);

    }

  }

  async cancel() {
    await this.router.navigate(['/learn/courses/']);
  }
}
