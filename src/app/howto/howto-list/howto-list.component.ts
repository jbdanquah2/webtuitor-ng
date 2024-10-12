import {Component, Input, OnInit} from '@angular/core';
import {HowtoService} from '../howto.service';

@Component({
  selector: 'app-howto-list',
  templateUrl: './howto-list.component.html',
  styleUrls: ['./howto-list.component.css']
})
export class HowtoListComponent implements OnInit {

  title:string = 'Most Useful How-To Tutorials'
  howtos:any

  constructor(private howtoService: HowtoService,
              ) {

  }

  ngOnInit(){
    this.howtoService.getHowtos().subscribe(howtos => this.howtos = howtos);

    window.scrollTo(0,0);
  }


}
