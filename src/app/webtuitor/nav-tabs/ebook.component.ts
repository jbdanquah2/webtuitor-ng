import { Component } from "@angular/core";
import { EbookService } from 'src/app/ebook/ebook.service';

@Component({
    selector: 'ebook-tab',
    template:`
    <div class="card-group">
        <div [routerLink]="['/course/',ebook.id]" *ngFor="let ebook of ebooks" class="card">
        <img heigt="200" class="card-img-top" [src]="ebook.img" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">{{ebook.name}}</h5>
            <p class="card-text">{{ebook.description}}</p>
            <button [routerLink]="['/course/',ebook.id]" class="btn btn-md btn-outline-info">Get it</button>&nbsp;
            <span class="text-warning" *ngIf="ebook.license">{{ebook.license}}</span>
            <p class="card-text">
                <span><small class="text-muted">{{ebook.published}}</small></span>&nbsp;&nbsp;&nbsp;
                <span class="text-right"><small class="text-muted">{{ebook.totalTime}}</small></span>
        </p>
        </div>
        </div>
    </div>`,
    styleUrls:['nav-tab.component.css']
})
export class EbookComponent {
    ebooks:any
    constructor(private ebookService:EbookService ) {
    }
    ngOnInit() {
        this.ebooks = this.ebookService.getEbooks();
    }
   
}