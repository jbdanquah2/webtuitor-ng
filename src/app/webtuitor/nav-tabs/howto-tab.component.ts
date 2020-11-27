import { Component } from "@angular/core";
import { HowtoService } from 'src/app/howto/howto.service';

@Component({
    selector: 'howto-tab',
    template:`
    <div class="card-group">
        <div *ngFor="let howto of howtos" class="card">
        <img heigt="200" class="card-img-top" [src]="howto.img" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">{{howto.name}}</h5>
            <p class="card-text">{{howto.description}}</p>
            <button class="btn btn-md btn-outline-info">Start</button>
            <p class="card-text">
                <span><small class="text-muted">{{howto.published}}</small></span>&nbsp;&nbsp;&nbsp;
                <span class="text-right"><small class="text-muted">{{howto.totalTime}}</small></span>
        </p>
        </div>
        </div>
    </div>`,
    styleUrls:['nav-tab.component.css']
})
export class HowtoComponent {
    howtos:any
    constructor(private howtoService:HowtoService ) {
    }
    ngOnInit() {
        this.howtos = this.howtoService.getHowtos();
    }
   
}