import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { mentorRoutes } from './mentor.routes';
import { MentorComponent } from './mentor.component';
import { MentorPageComponent } from './mentor-page/mentor-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(mentorRoutes)
    ],
    declarations: [
        MentorComponent,
        MentorPageComponent
    ],
    providers: [

    ]
})
export class MentorModule {

}
