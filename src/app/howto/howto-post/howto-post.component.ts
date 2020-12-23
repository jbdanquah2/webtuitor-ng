import { Component, Input } from "@angular/core";
import { HowtoService } from '../howto.service';
import { ActivatedRoute } from "@angular/router";
import { StringService } from "src/app/untility/string.service";

@Component({
    selector:'howto-post',
    templateUrl:'howto-post.component.html',
    styles:[`

    `]
})
export class HowtoPostComponent {
    howto:any
    @Input() strService:any
    related:any
    constructor(private howtoService: HowtoService, private route: ActivatedRoute,
     private stringService: StringService) {

    }
    ngOnInit(){
        this.howto = this.howtoService.getHowto(this.route.snapshot.params['link'])
        this.strService = this.stringService
        window.scrollTo(0,0);
    }
    getRelated() {
        this.related = this.howtoService.getRelatedHowto(this.howto.related)
        return [this.related.name, this.related.link]
    }
}