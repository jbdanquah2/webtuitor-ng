import { Component, Input } from "@angular/core";
import { HowtoService } from '../howto.service';
import { ActivatedRoute, Router } from "@angular/router";
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
     private stringService: StringService, private router : Router) {

    }
    ngOnInit(){
        this.howto = this.howtoService.getHowto(this.route.snapshot.params['link'])
        this.strService = this.stringService
        this.related = this.howtoService.getRelatedHowto(this.howto.related)
        window.scrollTo(0,0);
    }
    // getRelated() {
    //     // this.related = this.howtoService.getRelatedHowto(this.howto.related)
    //     // this.router.navigate(['howto-post']);
    //     // window.scrollTo(0,0);
    //     return [this.related.name, this.related.link]
    // }
}