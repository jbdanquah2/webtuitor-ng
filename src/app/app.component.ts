import {Component, Input, OnInit} from '@angular/core';
import { Title } from "@angular/platform-browser";
import { CookieService } from "ngx-cookie-service";
import {LoadingService} from './services/loading.service';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <title>WebTuitor</title>
    <app-loading></app-loading>
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})
export class AppComponent implements OnInit {
  // @Input() title:any = "Webtuitor"

  constructor(private titleService: Title,
              private loadingService: LoadingService,
              private router: Router) {
    this.setTitle("Webtuitor");
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.startLoading();
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loadingService.stopLoading();
      }
    });
  }


  public setTitle( newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

}
