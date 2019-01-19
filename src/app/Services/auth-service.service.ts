import { UserService } from './user-service.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { userInfo } from 'os';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
private currentUser;
private user: Observable<any[]>;


  constructor(private authService: AngularFireAuth,
               private userService: UserService,
               private db: AngularFireDatabase) { }


/**
 * Login User to Firebase using Google provider
 */
  login() {
    this.authService.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(response => {
        console.log(response.user);
        this.currentUser = response.user.displayName;
        this.userService.changeUser(response.user.displayName);

        const user = {
          id: response.user.uid,
          Name: response.user.displayName,
          Username: response.user.displayName
        };

        this.saveLoggedInUser(user);

        this.getUserRole(user);
      });
  }

/**
 * Log Out User from Firebase using Google provider
 */
  logout() {
    this.authService.auth.signOut();
  }

  getCurrentUser(): string {
    return this.currentUser;
  }

  getUserRole(user) {
    const xxx = this.db.object('Users' + '/' + user.id).valueChanges()
      .subscribe(response => {
        console.log(response);
        this.userService.changeAdminRole(response.isAdmin);
      });

    console.log(xxx);
  }

  private saveLoggedInUser(user) {
    const userRef = this.db.object('/Users' + '/' + user.id);
    userRef.update({Name: user.Name, Username: user.Username});
  }


}
