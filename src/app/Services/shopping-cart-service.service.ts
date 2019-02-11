import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Product } from '../Models/Product';

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
    const cartNode = this.db.list(`ShoppingCart/${cartID}/Items`);
    cartNode.push(item.key);
    // save the product
    const cartNode2 = this.db.list(`ShoppingCart/${cartID}/Products`);
    cartNode2.push(item);
  }

  /**
 * Remove items under users key in shopping cart node
 * @param itemID : number
 * @param userID : string
 */
  RemoveItemToUserShoppingCartNode(itemID: string, userID: string) {
    // find the user node in shopping cart
    const userNode = this.db.list(`/ShoppingCart/${userID}`, ref => ref.equalTo(itemID));
    return userNode.remove();
  }

  /**
   * Get Users Shopping Cart Items
   * @param userID
   */
  GetUsersShoppingCartItems(userID) {
    return this.db.list(`/ShoppingCart/${userID}`).valueChanges();
  }

}
