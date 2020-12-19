import { Component } from "@angular/core";
import { HowtoService } from '../howto.service';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector:'howto-post',
    templateUrl:'howto-post.component.html',
    styles:[`

    `]
})
export class HowtoPostComponent {
    howto:any
    constructor(private howtoService: HowtoService, private route: ActivatedRoute) {

    }
    ngOnInit(){
        this.howto = this.howtoService.getHowto(this.route.snapshot.params['link'])
        
    }
}