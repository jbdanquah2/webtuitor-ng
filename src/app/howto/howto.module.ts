import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { howtoRoutes } from "./howto.routes";
import { HowtoComponent } from "./howto.component";
import { HowtoPostComponent } from "./howto-post/howto-post.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(howtoRoutes)
    ],
    declarations: [
        HowtoComponent,
        HowtoPostComponent
    ],
    providers: [

    ]

})
export class HowtoModule {

}