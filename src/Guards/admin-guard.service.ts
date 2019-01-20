
import { AuthService } from './../app/Services/auth-service.service';
import { CanActivate, Route, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppUser } from 'src/app/Models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
private canView = false;
  constructor(private authService: AuthService, private router: Router) { }

canActivate(): Observable<boolean> | boolean {
  return this.authService.user$
    .pipe(
      switchMap(user => this.authService.getUserRole(user.uid)),
      map((response: AppUser) => {
        return response.isAdmin;
      })
    );
}
}
