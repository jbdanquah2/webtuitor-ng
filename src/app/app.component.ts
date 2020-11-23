import { Component } from '@angular/core';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})
export class AppComponent {
  constructor(private titleService: Title) {}

  public setTitle( newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
