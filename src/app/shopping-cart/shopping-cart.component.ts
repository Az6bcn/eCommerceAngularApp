import { Product } from './../Models/Product';
import { ShoppingCartServiceService } from './../Services/shopping-cart-service.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  totalItemInCart: number;
  totalPrice: number;
  quantity: number;
  data = new Array<any>();
  constructor(private shoppingCartService: ShoppingCartServiceService) { }

  ngOnInit() {
    const cartID = localStorage.getItem('cartID');
    if (cartID) {
      this.GetUsersShoppingCartItemQuantityByItemID(cartID);
      this.GetUsersShoppingCartItems(cartID);
      this.GetUsersShoppingCartItemsTotalPrice(cartID);
      this.GetUsersShoppingCartTotalItems(cartID);
    }
  }

  GetUsersShoppingCartItemQuantityByItemID(itemID: string) {
    const cartID = localStorage.getItem('cartID');
    this.shoppingCartService.GetUsersShoppingCartItems(cartID)
      .subscribe( (response: Array<any>) => {
        const responseObject: Array<Product> = response.find( p => p['Product']['key'] === itemID);
        if (responseObject) {
          this.quantity = responseObject['quantity'];
        }
      });
  }

  GetUsersShoppingCartTotalItems(cartID: string) {
    this.shoppingCartService.GetUsersShoppingCartItems(cartID)
      .subscribe( (response: Array<any>) => {
        this.totalItemInCart = response
        .map(q => q['quantity'])
        .reduce( (accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
      });
  }
  GetUsersShoppingCartItems(cartID: string) {
    this.shoppingCartService.GetUsersShoppingCartItems(cartID)
      .subscribe( (response: Array<any>) => {
        this.data = response;
      });
  }

  AddToCart(item: Product) {

    const cartID = localStorage.getItem('cartID');

    if (!cartID) {
      this.shoppingCartService.CreateUserCart()
        .then (res => {
          localStorage.setItem('cartID', res.key);

          // Add first item to the cartID
          this.AddItem(item, res.key);
          this.GetUsersShoppingCartItemQuantityByItemID(item.key);
        });
        return;
    }

    // Add first item to the cartID
    this.AddItem(item, cartID);
    this.GetUsersShoppingCartItemQuantityByItemID(item.key);
  }

  RemoveItem(item: Product) {

    const cartID = localStorage.getItem('cartID');
    this.shoppingCartService.RemoveItemToUserShoppingCartNode(item.key, cartID);
    this.GetUsersShoppingCartItemQuantityByItemID(item.key);
  }

  AddItem(item: Product, cartID?: string) {

    const cartIDs = (cartID === null) ?  localStorage.getItem('cartID') : cartID;

    this.shoppingCartService.AddItemToUserShoppingCartNode(item, cartIDs);
  }

  GetUsersShoppingCartItemsTotalPrice(cartID: string) {
    this.shoppingCartService.GetUsersShoppingCartItems(cartID)
      .subscribe( (response: Array<any>) => {
        this.totalPrice = response
        .map(q =>  (q['Product']['price'] * q['quantity'])
        )
        .reduce( (accumulator: number, currentValue) => {
          return accumulator + currentValue;
        }, 0.0);
      });
  }

  ClearShoppingCart() {
    const cartID = localStorage.getItem('cartID');
    this.shoppingCartService.ClearShoppingCart(cartID);
  }

  Order() {
    alert('Order not implemented...... Thanks for using Organic Shop');
  }
}
