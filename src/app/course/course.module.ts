import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { courseRoutes } from "./course.routes";
import { CourseComponent } from "./course.component";
import { CoursePostComponent } from "./course-post/course-post.component";
import { CourseListComponent } from './course-list/course-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(courseRoutes)
    ],
    declarations: [
        CourseComponent,
        CoursePostComponent,
        CourseListComponent
    ],
    providers: [

    ]

})
export class CourseModule {

}