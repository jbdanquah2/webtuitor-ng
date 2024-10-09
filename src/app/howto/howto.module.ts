import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { howtoRoutes } from "./howto.routes";
import { HowtoComponent } from "./howto.component";
import { HowtoPostComponent } from "./howto-post/howto-post.component";
import { HowtoListComponent } from './howto-list/howto-list.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(howtoRoutes)
    ],
    declarations: [
        HowtoComponent,
        HowtoPostComponent,
        HowtoListComponent
    ],
    providers: [

    ]

})
export class HowtoModule {

}