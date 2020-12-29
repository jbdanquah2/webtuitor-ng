import { Routes } from "@angular/router";
import { MentorPageComponent } from "./mentor-page/mentor-page.component";
import { MentorComponent } from "./mentor.component";

export const mentorRoutes:Routes = [
    { path: 'mentors', component: MentorComponent },
    { path: 'mentors/:id', component: MentorPageComponent },
]