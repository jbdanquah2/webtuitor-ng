import { Component } from "@angular/core";
import { StringService } from "src/app/untility/string.service";

@Component({
    selector: 'webtuitor-home',
    styleUrls:['webtuitor.component.css'],
    templateUrl:'webtuitor.component.html',
    
})
export class WebtuitorComponent {
    title ='Webtuitor | Home';
    strService;
    constructor(private stringService:StringService) {

    }

    ngOnInit() {
        this.strService = this.stringService;
    }
}