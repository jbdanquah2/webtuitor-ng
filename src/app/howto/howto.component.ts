import { Component } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { HowtoService } from './howto.service';

@Component({
    selector:'app-howto',
    templateUrl:'howto.component.html',
    styleUrls:['howto.component.css']
})
export class HowtoComponent {
    title:string = 'Most Useful How-To Tutorials'
    howtos:any
    constructor(private howtoService: HowtoService, private route: ActivatedRoute) {

    }
    ngOnInit(){
        this.howtos = this.howtoService.getHowtos()  ;  
    }
}