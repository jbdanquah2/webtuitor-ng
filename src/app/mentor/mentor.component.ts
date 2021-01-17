import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorService } from "./mentor.service";

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css','../shared-css/page-css.css']
})
export class MentorComponent implements OnInit {
  mentors:any
  title:string = 'Mentors'

  constructor(private mentorService:MentorService, private router: Router,
    private route:ActivatedRoute) { }

  ngOnInit() {
      // this.mentorService.getMentors().subscribe(mentors => {
      this.mentors = this.route.snapshot.data['mentors'];
      console.log(this.mentors);
      
    // })
    window.scrollTo(0,0);
    
    if (this.mentors =='undefined' || !this.mentors) this.router.navigate(['404']);
  }

}
