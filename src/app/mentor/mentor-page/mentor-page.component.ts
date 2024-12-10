import { Component, OnInit } from '@angular/core';
import { MentorService } from "src/app/mentor/mentor.service";
import { StringService } from "src/app/services/string.service";
import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import {getDateTime, getTime} from '../../../../rest-api/src/utils/string.utils';

@Component({
  selector: 'app-mentor-page',
  templateUrl: './mentor-page.component.html',
  styleUrls: ['./mentor-page.component.css']
})
export class MentorPageComponent implements OnInit {
  user: any
  mentor: any
  cTime: any
  mouseoverlogin: any
  chatIn: any

  constructor(private mentorService: MentorService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.mentor = this.route.snapshot.data['mentor'];
    window.scrollTo(0, 0)
    this.user = this.route.snapshot.params['login'];

    if (this.user != 'undefined' || this.user != null || this.user != '') {

      getDateTime();

      this.cTime = document.getElementById('cTime');
    }
  }


  sendChat(chatForm) {

    let p = document.createElement("p");
    p.classList.add('alert', 'alert-primary', 'text-right', 'clearfix','mb-1')
    if (this.mentor != 'undefined' || this.mentor != null || this.mentor != '') {
      p.innerHTML = `${chatForm.chatIn}<br><small class="float-left text-info"> [ ${getDateTime()} | ${getTime()} ]</small>`;
      document.querySelector('#chat').appendChild(p);

    }
  }

  getDateTime() {
    return getDateTime();
  }
}
