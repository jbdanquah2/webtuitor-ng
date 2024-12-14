import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { courseRoutes } from "./course.routes";
import { CourseComponent } from "./course.component";
import { CoursePostComponent } from "./course-post/course-post.component";
import { CourseListComponent } from './course-list/course-list.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuillEditorComponent} from 'ngx-quill';
import { CreateLessonComponent } from './lesson/create-lesson/create-lesson.component';
import { EditLessonComponent } from './lesson/edit-lesson/edit-lesson.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(courseRoutes),
    FormsModule,
    QuillEditorComponent,
    ReactiveFormsModule
  ],
    declarations: [
        CourseComponent,
        CoursePostComponent,
        CourseListComponent,
        EditCourseComponent,
        CreateLessonComponent,
        EditLessonComponent
    ],
    providers: [

    ]

})
export class CourseModule {

}
