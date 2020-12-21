import { Component, Input } from "@angular/core";
import { EbookService } from 'src/app/ebook/ebook.service';
import { StringService } from "src/app/untility/string.service";

@Component({
    selector: 'ebook-tab',
    template:`
    <div class="card-group">
        <div [routerLink]="['/ebooks/',ebook.link]" *ngFor="let ebook of ebooks | slice:0:4; let i=index" class="card">
        <img heigt="200" class="card-img-top" [src]="ebook.img" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">{{ebook.name}}</h5>
            <p class="card-text">{{concatStr.concatString(ebook.description,50)}}</p>
            <button [routerLink]="['/ebooks/',ebook.link]" class="btn btn-md btn-outline-info">Get it</button>&nbsp;
            <span class="text-warning" *ngIf="ebook.license">{{ebook.license}}</span>
            
        </div>
        </div>
    </div>`,
    styleUrls:['nav-tab.component.css']
})
export class EbookTabComponent {
    ebooks:any
    @Input()concatStr:any
    constructor(private ebookService:EbookService, private stringService:StringService ) {
    }
    ngOnInit() {
        this.ebooks = this.ebookService.getEbooks();
        this.concatStr = this.stringService;
    }
   
}