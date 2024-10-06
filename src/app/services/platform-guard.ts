import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../user/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',  // Makes the guard available throughout the app
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,  // Inject the authentication service
    private router: Router  // Inject the router for navigation
  ) {}

  canActivate(): Observable<boolean> | boolean {
    if (this.authService.isAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/auth/user/login']);
      return false
    }
  }
}
