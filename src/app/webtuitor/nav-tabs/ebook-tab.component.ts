import {Component, Input, OnInit} from '@angular/core';
import { EbookService } from 'src/app/ebook/ebook.service';
import { StringService } from "src/app/services/string.service";
import {capitalizeFirstLetter, concatString} from '../../../../rest-api/src/utils/string.utils';

@Component({
    selector: 'ebook-tab',
    template:`
    <div class="card-group">
        <div [routerLink]="['/read/get-an-ebook/',ebook.link]" *ngFor="let ebook of ebooks | slice:0:4; let i=index" class="card">
        <img height="200" class="card-img-top" [src]="ebook.img" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">{{capitalizeFirstLetter(ebook.name)}}</h5>
            <p class="card-text">{{concatString(ebook.description,50)}}</p>
            <button [routerLink]="['/read/get-an-ebook/',ebook.link]" class="btn btn-md btn-outline-info">Get it</button>&nbsp;
            <span class="text-warning" *ngIf="ebook.license">{{ebook.license}}</span>

        </div>
        </div>
    </div>`,
    styleUrls:['nav-tab.component.css']
})
export class EbookTabComponent implements OnInit {
    ebooks:any
    constructor(private ebookService:EbookService ) {
    }
    ngOnInit() {
        this.ebooks = this.ebookService.getEbooks();

    }

  protected readonly concatString = concatString;
  protected readonly capitalizeFirstLetter = capitalizeFirstLetter;
}
