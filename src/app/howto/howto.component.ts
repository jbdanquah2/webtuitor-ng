import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { HowtoService } from './howto.service';
import { StringService } from "src/app/services/string.service";
import {environment} from '../../environments/environment';
import {AuthService} from '../user/auth.service';
import {capitalizeFirstLetter} from '../../../rest-api/src/utils/string.utils';

@Component({
    selector:'howto-card',
    templateUrl:'howto.component.html',
    styleUrls:['howto.component.css','../shared-css/page-css.css',


]
})
export class HowtoComponent implements OnInit {

  title:string = 'Most Useful How-To Tutorials';

  isAuthenticated: boolean = this.authService.isAuthenticated;

  @Input()
  howto:any

  @Output()
  deletedHowto: EventEmitter<any> = new EventEmitter<any>();

  constructor(private stringService:StringService,
              private router: Router,
              private authService: AuthService,
              private howtoService: HowtoService) {

  }
  ngOnInit(){

    console.log('here:::',this.howto)
    window.scrollTo(0,0);
  }

  editHowto() {
    this.router.navigateByUrl(`/quick/howtos/edit/${this.howto.id}`);
  }

  async deleteHowto() {

    const result = confirm('Are you sure you want to delete this how-to?');

    if (!result) {
      return;
    }

    await this.howtoService.deleteHowto(this.howto.id);

    this.deletedHowto.emit(this.howto);

    // location.reload();
  }

  protected readonly capitalizeFirstLetter = capitalizeFirstLetter;
}
