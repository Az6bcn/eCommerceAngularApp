import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private User = new BehaviorSubject<string>(null);
  private isAdmin = new BehaviorSubject<boolean>(false);
  currentUser = this.User.asObservable();
  isCurrentUserAdmin = this.isAdmin.asObservable();

  constructor() {

  }

  /**
   * change the BehaviourSubject value
   * @param user => currently logged in user
   */
  changeUser(user: string) {
    // change the BehaviourSubject value
    this.User.next(user);
  }

  /**
   * change the BehaviourSubject value
   * @param isAdmin => currently logged Admin?
   */
  changeAdminRole(isAdmin: boolean) {
    console.log('zzzzzzzzzzzzzz', isAdmin);
    // change the BehaviourSubject value
    this.isAdmin.next(isAdmin);
  }
}
