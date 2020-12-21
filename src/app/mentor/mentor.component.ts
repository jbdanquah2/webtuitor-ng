import { Component, OnInit } from '@angular/core';
import { MentorService } from "./mentor.service";

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css','../shared-css/page-css.css']
})
export class MentorComponent implements OnInit {
  mentors:any
  title:string = 'Mentors'

  constructor(private mentorService:MentorService) { }

  ngOnInit() {
    this.mentorService.getMentors().subscribe(mentors => this.mentors = mentors)
    window.scrollTo(0,0)
  }

}
