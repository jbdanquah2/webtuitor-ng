import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../user/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'list-sidebar',
  templateUrl: './list-sidebar.component.html',
  styleUrls: ['./list-sidebar.component.css']
})
export class ListSidebarComponent implements OnInit {

    isAuthenticated: boolean = this.authService.isAuthenticated;

    @Input()
    course:any

    constructor(private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {

    }



  addLesson() {

    this.router.navigateByUrl(`/learn/courses/${this.course.id}/lessons/add`);
  }
}
