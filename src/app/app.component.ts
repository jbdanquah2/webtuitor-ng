import { Component, Input } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  template: `
    <title>WebTuitor</title>
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})
export class AppComponent {
  // @Input() title:any = "Webtuitor"

  constructor(private titleService: Title) {}

  public setTitle( newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
