import { Component, Input } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { HowtoService } from './howto.service';
import { StringService } from "src/app/untility/string.service";

@Component({
    selector:'app-howto',
    templateUrl:'howto.component.html',
    styleUrls:['howto.component.css','../shared-css/page-css.css',
 

]
})
export class HowtoComponent {
    title:string = 'Most Useful How-To Tutorials'
    howtos:any
    @Input() strService:any
    constructor(private howtoService: HowtoService, private route: ActivatedRoute, 
        private stringService:StringService) {

    }
    ngOnInit(){
        this.howtoService.getHowtos().subscribe(howtos => this.howtos = howtos);
        this.strService = this.stringService  
        window.scrollTo(0,0);
    }
    // pushFooterToBottom() {
    //     return
    // }
}