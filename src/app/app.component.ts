import { Component, Input } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-root',
  template: `
    <title>11WebTuitor</title>
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})
export class AppComponent {
  // @Input() title:any = "Webtuitor"

  constructor(private titleService: Title, private cookieService:CookieService) {}

  public setTitle( newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

}
