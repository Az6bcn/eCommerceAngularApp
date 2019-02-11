import { ShoppingCartServiceService } from './../Services/shopping-cart-service.service';
import { Product } from './../Models/Product';
import { Component, OnInit, Input } from '@angular/core';
import { database } from 'firebase';

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

    if (this.quantity === 1) {
      this.quantity = 0;
      this.showQuantityBtns = false;
      this.showAddToCartBtn = true;
    }

    this.quantity = this.quantity - 1;

    this.DecrementTotalItem(this.quantity);

    let userID = localStorage.getItem('userID');
      this.shoppingCartService.RemoveItemToUserShoppingCartNode(item.key, userID);
  }

  AddItem(item: Product, cartID?: string) {

    this.quantity = this.quantity + 1;
    const xxx = this.IncrementTotalItem(this.quantity);
    const cartIDs = (cartID === null) ?  localStorage.getItem('cartID') : cartID;
    console.log('cartIDs', cartIDs);
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
        });
    }

    // Add first item to the cartID
    this.AddItem(item, cartID);
  }

  IncrementTotalItem(quantity: number) {
    this.totalItemInCart = this.totalItemInCart + quantity;
    localStorage.setItem('TotalItem', this.totalItemInCart.toString());
  }

  DecrementTotalItem(quantity: number) {
    this.totalItemInCart = this.totalItemInCart - quantity;
    localStorage.setItem('TotalItem', this.totalItemInCart.toString());
  }
}
