import { userInfo } from 'os';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private userService: UserService) { }

  canActivate() {

    this.userService.currentUser
      .subscribe((response: string) => {
        if (response) return true;
      });

    return false;
  }
}
