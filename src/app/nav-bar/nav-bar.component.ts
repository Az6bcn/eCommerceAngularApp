import { BehaviorSubject } from 'rxjs';
import { AuthService } from './../Services/auth-service.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../Services/user-service.service';
import { NullViewportScroller } from '@angular/common/src/viewport_scroller';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
currentLoggedInUser$ = new BehaviorSubject<string>(null);
isLoggedIn$ = new BehaviorSubject<boolean>(false);
  constructor(private userService: UserService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.userService.currentUser
      .subscribe(response => {
        if (response) {
          this.isLoggedIn$.next(true);
          this.currentLoggedInUser$.next(response);
          this.cdr.detectChanges();
        }
      });
  }

  loggedOut() {
    this.isLoggedIn$.next(false);
    this.cdr.detectChanges();
  }



  // getCurrentUser(): string {
  //   this.currentLoggedInUser = this.userService.getCurrentUser();

  //   if (this.currentLoggedInUser !== null) {
  //     this.isLoggedIn$.next(true);

  //     return this.currentLoggedInUser;
  //   }

  //   this.isLoggedIn$.next(false);
  //   return ;
  // }

}
