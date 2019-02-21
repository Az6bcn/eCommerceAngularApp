import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Product } from '../Models/Product';
import {take} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartServiceService {
  private itemRef: AngularFireList<any>;
  private itemObjectRef: AngularFireObject<any>;


  private item: Observable<any>;
  constructor(private db: AngularFireDatabase) {
    this.itemRef = db.list('/ShoppingCart');
    this.itemObjectRef = db.object('/ShoppingCart');
    this.item = this.itemRef.snapshotChanges();
  }

  async CreateUserCart() {
    const date = Date.now();
    return await this.itemRef.push({CreatedAt: date});

  }

/**
 * Remove items under users key in shopping cart node
 * @param itemID
 * @param userID
 */
  AddItemToUserShoppingCartNode(item: Product, cartID: string) {
    // find the user node in shopping cart
    const cartNode$ = this.db.list(`ShoppingCart/${cartID}/Items/${item.key}`, ref => ref.limitToFirst(2))
    .valueChanges(); //list node
    const cartNodeRef = this.db.object(`ShoppingCart/${cartID}/Items/${item.key}`); //one object node

    cartNode$
    .pipe(take(1))
    .subscribe( (p: Array<any>) => {
     if (p.length > 0) {
       cartNodeRef.set({Product: item, quantity: (p[1] + 1)});
      }
    else {
      cartNodeRef.set({Product: item, quantity: 1});
      }
    });

  }

  /**
 * Remove items under users key in shopping cart node
 * @param itemID : number
 * @param userID : string
 */
  RemoveItemToUserShoppingCartNode(itemID: string, cartID: string) {
    const cartNodeRef = this.db.object(`ShoppingCart/${cartID}/Items/${itemID}`); //one object node
    cartNodeRef.valueChanges()
    .pipe(take(1))
    .subscribe(x => {
      console.log('xxx', x);
      if ( x['quantity'] === 1) {
        cartNodeRef.remove();
        return;
      }

      if (x['quantity'] > 1) {
        const cartNodeRef2 = this.db.object(`ShoppingCart/${cartID}/Items/${itemID}`); //one object node
        cartNodeRef2.update({quantity : x['quantity'] - 1});

      }
      return;
     });

  }

  /**
   * Get Users Shopping Cart Items
   * @param userID
   */
  GetUsersShoppingCartItems(cartID) {
    return this.db.list(`/ShoppingCart/${cartID}/Items`).valueChanges();
  }

  ClearShoppingCart(cartID: string) {
    const itemRef = this.db.list(`/ShoppingCart/${cartID}/Items`);
    itemRef.remove();
  }

}
