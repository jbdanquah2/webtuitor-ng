import {ActivatedRouteSnapshot} from '@angular/router';
import {inject} from '@angular/core';
import {HowtoService} from './howto.service';

export const howtoResolver = async (route: ActivatedRouteSnapshot): Promise<any> => {
  const howtoService = inject(HowtoService);
  const id = route.params['id'];

  const howto = await howtoService.getHowto(id);
  const relatedHowto = await howtoService.getRelatedHowto(howto.related);

  return {howto, relatedHowto};
}
