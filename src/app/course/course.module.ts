import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { courseRoutes } from "./course.routes";
import { CourseComponent } from "./course.component";
import { CoursePostComponent } from "./course-post/course-post.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(courseRoutes)
    ],
    declarations: [
        CourseComponent,
        CoursePostComponent
    ],
    providers: [

    ]

})
export class CourseModule {

}