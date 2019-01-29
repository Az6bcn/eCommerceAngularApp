import { Product } from './../Models/Product';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private itemRef: AngularFireList<any>;

  private item: Observable<any>;
  constructor(private db: AngularFireDatabase) {
    this.itemRef = db.list('/Products');
    this.item = this.itemRef.snapshotChanges();


  }

  CreateProduct(product: Product) {
    return this.itemRef.push(product);
  }

  editProduct(product: Product, key: string) {
    return this.db.object(`/Products/${key}`).update(product);
  }
  GetProducts() {
    return this.item;
  }

  GetProduct(id: string) {
    return this.db.object(`/Products/${id}`).valueChanges();
  }
}
