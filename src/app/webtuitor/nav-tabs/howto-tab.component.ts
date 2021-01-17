import { Component, Input } from "@angular/core";
import { HowtoService } from 'src/app/howto/howto.service';
import { StringService } from 'src/app/untility/string.service';

@Component({
    selector: 'howto-tab',
    template:`
    <div class="card-group">
        <div [routerLink]="['/quick/howtos/',howto.link]" *ngFor="let howto of howtos | slice:0:4; let i=index" class="card" >
        <img heigt="200" class="card-img-top" [src]="howto.img" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">{{howto.name}}</h5>
            <p class="card-text">{{concStr.concatString(howto.description,50)}}</p>
            <button [routerLink]="['/quick/howtos/',howto.link]" class="btn btn-md btn-outline-info">Start</button>
            <p class="card-text">
                <span><small class="text-muted">{{howto.published}}</small></span>&nbsp;&nbsp;&nbsp;
                <span class="text-right"><small class="text-muted">{{howto.totalTime}}</small></span>
        </p>
        </div>
        </div>
    </div>`,
    styleUrls:['nav-tab.component.css']
})
export class HowtoTabComponent {
    howtos:any
    @Input()concStr:any

    constructor(private howtoService:HowtoService, private stringService:StringService ) {
    }
    ngOnInit() {
        this.howtoService.getHowtos().subscribe( howtos => this.howtos = howtos) ;        
        this.concStr = this.stringService;
    }
   
}