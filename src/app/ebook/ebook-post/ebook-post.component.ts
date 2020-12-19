import { Component } from "@angular/core";
import { EbookService } from '../ebook.service';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector:'ebook-post',
    templateUrl:'ebook-post.component.html',
    styles:[`

    `]
})
export class EbookPostComponent {
    ebook:any
    constructor(private ebookService: EbookService, private route: ActivatedRoute) {

    }
    ngOnInit(){
        this.ebook = this.ebookService.getEbook(this.route.snapshot.params['link'])
        
    }
}