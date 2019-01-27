import { Product } from './../Models/Product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private itemRef: AngularFireObject<any>;
  private item: Observable<any>;
  constructor(private db: AngularFireDatabase) {
    this.itemRef = db.list('/Products');
    this.item = this.itemRef.valueChanges();
   }

  CreateProduct(product: Product) {
    return this.itemRef.push(product);
  }
}
