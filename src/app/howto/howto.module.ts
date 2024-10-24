import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { howtoRoutes } from "./howto.routes";
import { HowtoComponent } from "./howto.component";
import { HowtoPostComponent } from "./howto-post/howto-post.component";
import { HowtoListComponent } from './howto-list/howto-list.component';
import { CreateHowtoComponent } from './create-howto/create-howto.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuillEditorComponent} from 'ngx-quill';
import {EditHowtoComponent} from './edit-howto/edit-howto.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(howtoRoutes),
    FormsModule,
    ReactiveFormsModule,
    QuillEditorComponent,
  ],
    declarations: [
      HowtoComponent,
      HowtoPostComponent,
      HowtoListComponent,
      CreateHowtoComponent,
      EditHowtoComponent
    ],
    providers: [

    ]

})
export class HowtoModule {

}
