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
        EditCourseComponent
    ],
    providers: [

    ]

})
export class CourseModule {

}
