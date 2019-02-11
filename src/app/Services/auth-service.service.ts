import { AppUser } from 'src/app/Models/app-user';
import { UserService } from './user-service.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable, BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';
import { RouterStateSnapshot, Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
 user$: Observable<firebase.User>;
 userRole$: Observable<{}>;


  constructor(private afAuthService: AngularFireAuth,
               private db: AngularFireDatabase,
               private state: ActivatedRoute,
               private router: Router) {
                  this.user$ = afAuthService.authState;
               }


/**
 * Login User to Firebase using Google provider
 */
  login() {
    this.afAuthService.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(response => {


        const user = {
          id: response.user.uid,
          Name: response.user.displayName,
          Username: response.user.displayName
        };

        this.saveLoggedInUser(user);




        let returnUrl = localStorage.getItem('returnUrl');
        this.router.navigateByUrl(returnUrl || '/');
      });
  }

/**
 * Log Out User from Firebase using Google provider
 */
  logout() {
    this.afAuthService.auth.signOut();
  }


  getUserRole(uid) {
    return this.db.object('Users' + '/' + uid).valueChanges();

  }

  private saveLoggedInUser(user) {
    localStorage.setItem('userID', user.id);

    const userRef = this.db.object('/Users' + '/' + user.id);
    userRef.update({Name: user.Name, Username: user.Username});
  }



}

