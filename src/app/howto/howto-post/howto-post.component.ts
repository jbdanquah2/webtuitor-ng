import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {capitalizeFirstLetter} from '../../../../rest-api/src/utils/string.utils';

@Component({
    selector:'howto-post',
    templateUrl:'howto-post.component.html',
    styles:[`

    `]
})
export class HowtoPostComponent implements OnInit {
    howto:any

    related:any

    relatedUrl:string

    constructor(private route: ActivatedRoute,
                private router : Router) {

    }

    async ngOnInit(){

      const data = this.route.snapshot.data['howtoData'];

      this.howto = data.howto;

      this.related = data.relatedHowto;

    }

    determineRelatedUrl() {

      if (this.router.url.includes('related')) {

        return this.relatedUrl = '/quick/howtos';

      } else {

        return this.relatedUrl = '/quick/howtos/related';

      }

    }

    capitalizeFirstLetter(text: string) {
      if (!text) {
        return '';
      }
      return capitalizeFirstLetter(text);
    }
}
