import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { AuthService } from "src/app/user/auth.service";
import { IUser } from "src/app/user/user.model";

@Component({
    selector: 'app-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: [`navbar.component.css`]
})
export class NavbarComponent implements OnInit {
    constructor(public authService:AuthService) {

    }
    ngOnInit() {
    }
}