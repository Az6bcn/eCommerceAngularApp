import { AppUser } from 'src/app/Models/app-user';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './../Services/auth-service.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../Services/user-service.service';
import { NullViewportScroller } from '@angular/common/src/viewport_scroller';
import { auth } from 'firebase';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  constructor(public authService: AuthService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  logOut() {
    this.authService.logout();
  }

  getRole(): Observable<boolean> {
    return this.authService.user$
      .pipe(
        switchMap(user => this.authService.getUserRole(user.uid)),
        map((user: AppUser) => {
          return user.isAdmin;
        }
        ));
  }

  // loggedOut() {
  //   this.isLoggedIn$.next(false);
  //   this.cdr.detectChanges();
  // }


}
