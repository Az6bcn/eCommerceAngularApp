import { AuthService } from './../app/Services/auth-service.service';

import { Injectable, ChangeDetectorRef } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'src/app/Services/user-service.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.user$
      .pipe(map(user => {
        if(user) return true;

        let returnUrl = state.url;
        localStorage.setItem('returnUrl', returnUrl);

        // redirect user
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});

        return false;
      }));
  }
}

