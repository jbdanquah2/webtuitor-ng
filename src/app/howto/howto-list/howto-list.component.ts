import {Component, OnInit} from '@angular/core';
import {HowtoService} from '../howto.service';
import {Router} from '@angular/router';
import {AuthService} from '../../user/auth.service';

@Component({
  selector: 'app-howto-list',
  templateUrl: './howto-list.component.html',
  styleUrls: ['./howto-list.component.scss']
})
export class HowtoListComponent implements OnInit {

  title:string = 'Most Useful How-To Tutorials';

  howtos:any

  isAuthenticated: boolean = this.authService.isAuthenticated;

  constructor(private howtoService: HowtoService,
              private router: Router,
              private authService: AuthService
              ) {

  }

  async ngOnInit(){
    this.howtos = await this.howtoService.getHowtos();
    console.log('this.howtos:',this.howtos);
  }

  openCreateHowto() {
    if (!this.isAuthenticated) {
      alert('You must be logged in to create a how-to');
      return this.router.navigate(['/auth/login']);
    }
    this.router.navigate(['/quick/howtos/create']);
  }


  onDelete(deletedHowto:any) {
    console.log('deleted howto:',deletedHowto);
    this.howtos = this.howtos.filter((howto:any) => howto.id !== deletedHowto.id);
  }
}
