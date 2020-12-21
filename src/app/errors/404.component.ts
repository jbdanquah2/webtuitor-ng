import { Component } from '@angular/core'

@Component({
  template: `
    <h1 class="errorMessage">404'd</h1>
    <h3 class="p-5 mt-5 text-center">The page or resource you are trying to access can not be found</h3>
  `,
  styles: [`
    .errorMessage { 
      margin-top:100px; 
      color: rgba(255,0,0,0.5);
      font-size: 170px;
      text-align: center; 
    }`]
})
export class Error404Component{
  constructor() {

  }

}
