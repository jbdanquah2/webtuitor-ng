import { Component, OnInit } from '@angular/core';
import { MentorService } from "src/app/mentor/mentor.service";
import { StringService } from "src/app/untility/string.service";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-mentor-page',
  templateUrl: './mentor-page.component.html',
  styleUrls: ['./mentor-page.component.css']
})
export class MentorPageComponent implements OnInit {
  user: any
  mentor: any
  strService: any
  cTime: any
  mouseoverlogin: any
  chatIn: any

  constructor(private mentorService: MentorService, private route: ActivatedRoute,
    private stringService: StringService,) {

  }

  ngOnInit() {
    this.mentor = this.route.snapshot.data['mentor'];
    window.scrollTo(0, 0)
    this.user = this.route.snapshot.params['login'];
    if (this.user != 'undefined' || this.user != null || this.user != '') {
      this.strService = this.stringService
      this.strService.getDateTime();

      this.cTime = document.getElementById('cTime');  
    }

  }

  time() {
   
      let d = new Date();
      let s = d.getSeconds();
      let m = d.getMinutes();
      let h = d.getHours();
      if (this.mentor != 'undefined' || this.mentor != null || this.mentor != '') {
        // console.log('hiiiiii');
        document.getElementById('cTime').innerHTML = `<small>${h}:${m}:${s}</small>`;
      }
      
  }

  sendChat(chatForm) {

    let p = document.createElement("p");
    p.classList.add('alert', 'alert-primary', 'text-right', 'clearfix','mb-1')
    if (this.mentor != 'undefined' || this.mentor != null || this.mentor != '') {
      p.innerHTML = `${chatForm.chatIn}<br><small class="float-left text-info"> [ ${this.stringService.getDateTime()} | ${this.stringService.time()} ]</small>`;
      document.querySelector('#chat').appendChild(p);
      
    }


  }

}
