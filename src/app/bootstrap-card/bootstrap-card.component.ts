import { Product } from 'src/app/Models/Product';
import { ShoppingCartServiceService } from './../Services/shopping-cart-service.service';
import { Component, OnInit, Input } from '@angular/core';
import { database } from 'firebase';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-bootstrap-card',
  templateUrl: './bootstrap-card.component.html',
  styleUrls: ['./bootstrap-card.component.css']
})
export class BootstrapCardComponent implements OnInit {
  totalItemInCart = 0;
  quantity: number;
  showAddToCartBtn = false;
  showQuantityBtns = false;
  @Input() data: Product;
  @Input() showButton: boolean;


  constructor(private shoppingCartService: ShoppingCartServiceService) { }

  ngOnInit() {

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

  AddToCart(item: Product) {
    this.showQuantityBtns = true;
    this.quantity = 1;

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

}
