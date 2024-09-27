import { Component } from "@angular/core";

@Component({
    selector: 'app-footer',
    templateUrl: 'footer.component.html',
    styles: [`
        footer {
            /*position: relative;*/
            /*top: 70vh!important;*/
        }
    `]
})
export class FooterComponent {

  constructor() {
  }


  get copyRightText() {
    return `Copyright @ WebTuitor ${new Date().getFullYear()}`;
  }


}
