import {Component, Input, OnInit} from '@angular/core';
import { HowtoService } from 'src/app/howto/howto.service';
import { StringService } from 'src/app/services/string.service';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../user/auth.service';
import {Router} from '@angular/router';
import {capitalizeFirstLetter, concatString} from '../../../../rest-api/src/utils/string.utils';

@Component({
    selector: 'howto-tab',
    template:`
    <div class="card-group">
        <div *ngFor="let howto of howtos | slice:0:4; let i=index" class="card" >
          <img height="200" width="200" class="card-img-top" [src]="howto?.imageUrl" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">{{capitalizeFirstLetter(howto?.title)}}</h5>
            <p class="card-text">{{concatString(howto?.description, 50)}}</p>
            <button [routerLink]="['/quick/howtos',howto.id]" class="btn btn-md btn-outline-info">Start</button>
            <button *ngIf="isAuthenticated" class="btn btn-link ql-align-right" (click)="editHowto(howto)">Edit</button>
<!--            <p class="card-text">-->
<!--              <span><small class="text-muted">{{howto.published}}</small></span>&nbsp;&nbsp;&nbsp;-->
<!--              <span class="text-right"><small class="text-muted">{{howto.totalTime}}</small></span>-->
<!--            </p>-->
          </div>
        </div>
    </div>`,
    styleUrls:['nav-tab.component.css']
})
export class HowtoTabComponent implements OnInit {

  apiUrl: string = environment.api.apiUrl;
  howtos:any

  isAuthenticated: boolean = this.authService.isAuthenticated;

  constructor(private howtoService:HowtoService,
              private stringService:StringService,
              private authService:AuthService,
              private router:Router) {
  }
  async ngOnInit() {
      this.howtos = await this.howtoService.getHowtos();
      console.log('this.howtos:',this.howtos);
  }

  editHowto(howto: any) {
    console.log('###howto:',howto);
    this.router.navigateByUrl(`/quick/howtos/edit/${howto.id}`);
  }


  protected readonly concatString = concatString;
  protected readonly capitalizeFirstLetter = capitalizeFirstLetter;
}
