import { Component, Input } from "@angular/core";
import { EbookService } from '../ebook.service';
import { ActivatedRoute } from "@angular/router";
import { StringService } from "src/app/services/string.service";
import {capitalizeFirstLetter} from '../../../../rest-api/src/utils/string.utils';

@Component({
    selector:'ebook-post',
    templateUrl:'ebook-post.component.html',
    styles:[`

    `]
})
export class EbookPostComponent {
    ebook:any
    @Input() strService:any
    constructor(private ebookService: EbookService, private route: ActivatedRoute,
        private stringService: StringService) {

    }
    ngOnInit(){
        this.ebook = this.ebookService.getEbook(this.route.snapshot.params['link'])
        this.strService = this.stringService
        window.scrollTo(0,0);
    }

  protected readonly capitalizeFirstLetter = capitalizeFirstLetter;
}
