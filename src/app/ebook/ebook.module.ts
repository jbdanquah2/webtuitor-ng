import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ebookRoutes } from './ebook.routes';
import { EbookComponent } from './ebook.component';
import { EbookPostComponent } from './ebook-post/ebook-post.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ebookRoutes)
    ],
    declarations: [
        EbookComponent,
        EbookPostComponent
    ],
    providers: [

    ]

})
export class EbookModule {

}
