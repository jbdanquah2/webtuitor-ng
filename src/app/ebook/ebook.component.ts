import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { EbookService } from './ebook.service';

@Component({
    selector:'app-ebook',
    templateUrl:'ebook.component.html',
    styleUrls:['ebook.component.css']
})
export class EbookComponent {
    ebooks:any
    title:string = 'Popular And Useful eBooks'
    constructor(private ebookService: EbookService, private route: ActivatedRoute) {

    }
    ngOnInit(id){
        this.ebooks = this.ebookService.getEbooks()    
    }
}