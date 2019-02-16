import { AppUser } from 'src/app/Models/app-user';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './../Services/auth-service.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../Services/user-service.service';
import { NullViewportScroller } from '@angular/common/src/viewport_scroller';
import { auth } from 'firebase';
import { switchMap, map } from 'rxjs/operators';
import { ShoppingCartServiceService } from '../Services/shopping-cart-service.service';
import { Product } from '../Models/Product';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  totalItemInCart: number;
  constructor(public authService: AuthService,
     private cdr: ChangeDetectorRef,
     private shoppingCartService: ShoppingCartServiceService) { }

  ngOnInit() {

    const cartID = localStorage.getItem('cartID');
    if (cartID){
      this.GetUsersShoppingCartItemQuantityByItemID(cartID);
    }
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
  GetUsersShoppingCartItemQuantityByItemID(cartID: string) {
    this.shoppingCartService.GetUsersShoppingCartItems(cartID)
      .subscribe( (response: Array<any>) => {
        this.totalItemInCart = response
        .map(q => q['quantity'])
        .reduce( (accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
      });
  }


}
