import { Component } from "@angular/core";

@Component({
    selector:'app-sidebar',
    templateUrl:'sidebar.component.html',
    styles: [`
        .sidebar {
            background: rgba(250, 250, 250, 0.8);
            padding: 80px 30px;
        }
        .sidebar {
        /* background: rgba(250, 250, 250, 0.8); */
        padding: 30px;
        margin: 0 0 100px 0;
        z-index: 1;
        }

    `]
})
export class SidebarComponent {

}