import { Component, OnInit } from '@angular/core';
import { MentorService } from "src/app/mentor/mentor.service";
import { StringService } from "src/app/untility/string.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-mentor-page',
  templateUrl: './mentor-page.component.html',
  styleUrls: ['./mentor-page.component.css']
})
export class MentorPageComponent implements OnInit {
  mentor: any
  strService: any
  cTime: any

  constructor(private mentorService: MentorService, private route: ActivatedRoute,
    private stringService: StringService) {

  }

  ngOnInit() {
    this.mentor = this.mentorService.getMentor(this.route.snapshot.params['id'])
    this.strService = this.stringService
    this.strService.getDateTime();
    window.scrollTo(0, 0)
    this.cTime = document.getElementById('cTime');
    this.time();
    setInterval(this.time, 1000)

  }

  time() {
    var d = new Date();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    document.getElementById('cTime').innerHTML = `<small>${h}:${m}:${s}</small>`;
  }

  sendChat(chatForm) {

    let p = document.createElement("p");
    p.classList.add('alert', 'alert-primary', 'text-right', 'clearfix')
    p.innerHTML = chatForm.chatIn + '<br><small class="float-left text-info"> [ ' + this.stringService.getDateTime() + ' | ' + this.stringService.time() + ' ]</small>';
    document.querySelector('#chat').appendChild(p);

  }

}
