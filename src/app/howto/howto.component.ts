import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HowtoService } from './howto.service';
import { StringService } from "src/app/services/string.service";

@Component({
    selector:'howto-card',
    templateUrl:'howto.component.html',
    styleUrls:['howto.component.css','../shared-css/page-css.css',


]
})
export class HowtoComponent implements OnInit {

    title:string = 'Most Useful How-To Tutorials'

    @Input()
    howto:any

    constructor(
      private howtoService: HowtoService,
      private stringService:StringService) {

    }
    ngOnInit(){
        // this.howtoService.getHowtos().subscribe(howtos => this.howtos = howtos);
        window.scrollTo(0,0);
    }

  capitalizeFirstLetter(text: string) {
    return this.stringService.capitalizeFirstLetter(text);
  }
}
