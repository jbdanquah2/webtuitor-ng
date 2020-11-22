import { Component, Input } from "@angular/core";
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'webtuitor-navbar',
    templateUrl: 'webtuitor-navbar.component.html',
    styles: [`
        .ml-auto {
            /* border: solid #cdcdcd; */
            padding: 5px 15px!important;
            font-weight: 700;
            background:  rgba(216, 210, 210, 0.2);  
        }
        
        .ml-auto a {
            color: #fefefe!important;
            text-shadow: #382a2a;   
        }

        .ml-auto a.Active {
            color: #0000ff!important;
        }


        @media only screen and (min-width: 720px) {
            .ml-auto {
                border: 0.5px solid #cdcdcd; 
            }
        }
    `]
})
export class WebtuitorNavbarComponent {
    
}