import {ActivatedRouteSnapshot, Router, } from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../user/auth.service';


export const AuthGuard =  async (route: ActivatedRouteSnapshot): Promise<any> =>  {

  const auth = inject(AuthService);
  const isAuthenticated = auth.isAuthenticated
  const router = inject(Router);

  if (!isAuthenticated) {
    await router.navigate(['/login']);
    alert('You must be logged in to view this page');
  }

  return isAuthenticated;
}

