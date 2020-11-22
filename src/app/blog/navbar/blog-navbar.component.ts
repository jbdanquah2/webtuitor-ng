import { Component } from "@angular/core";

@Component({
    selector: 'blog-navbar',
    templateUrl:'blog-navbar.component.html',
    styles:[`
        .top-header {
            height: 56px;           
        }
        nav {
            background: rgba(199, 61, 61, 0.8);
            /* z-index: 999; */
          }
        #top-search-box input[type='text'] {
        /* width: 500px!important; */
        border: none;
        }
        #top-search-box {
            display: block!important;
            border-radius: 2%;
            border-color: #aaa;
          }
        .ml-auto a {
        color: #fefefe!important;
        text-shadow: #382a2a;   
        }
        .ml-auto a.Active {
            color: #0000ff !important;
        }
        .ml-auto {
            /* border: solid #cdcdcd; */
            padding: 5px 15px!important;
            font-weight: 700;
            background:  rgba(216, 210, 210, 0.2);  
        }
    `]
})
export class BlogNavbarComponent {

}