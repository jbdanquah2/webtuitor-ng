import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { EbookService } from '../ebook.service';

@Injectable()
export class EbookRouteActivator implements CanActivate {
    constructor(private ebookService: EbookService, private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot) {
        const ebookExist = !!this.ebookService.getEbook(route.params['link'])

        if (!ebookExist)
            this.router.navigate(['404'])
        return ebookExist
    }
}
