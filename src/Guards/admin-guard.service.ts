import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from 'src/app/Services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService) { }

  canActivate() {
    this.userService.isCurrentUserAdmin
      .subscribe((response: boolean) => {
        console.log(response);
        if(response) return true;
      });

    return false;
  }
}
