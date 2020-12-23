import { Component, Input } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { EbookService } from './ebook.service';
import { StringService } from "src/app/untility/string.service";

@Component({
    selector:'app-ebook',
    templateUrl:'ebook.component.html',
    styleUrls:['../shared-css/page-css.css', 'ebook.component.css']
})
export class EbookComponent {
    ebooks:any
    title:string = 'Popular And Useful eBooks'
    @Input() strService:any
    constructor(private ebookService: EbookService, private route: ActivatedRoute, private stringService:StringService) {

    }
    ngOnInit(id){
        this.ebooks = this.ebookService.getEbooks()  
        this.strService = this.stringService
        window.scrollTo(0,0);  
    }
}