import { Routes } from "@angular/router";
import { MentorPageResolver } from "./mentor-page/mentor-page-resolver.service";
import { MentorPageComponent } from "./mentor-page/mentor-page.component";
import { MentorResolver } from "./mentor-resolver.service";
import { MentorComponent } from "./mentor.component";

export const mentorRoutes:Routes = [
    { path: 'mentors', component: MentorComponent, resolve: {mentors:MentorResolver }},
    { path: 'mentors/:login', component: MentorPageComponent, resolve: {mentor:MentorPageResolver }},
]