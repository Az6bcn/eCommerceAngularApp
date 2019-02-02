import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../Services/product.service';
import { Product } from './../Models/Product';
import { Component, OnInit } from '@angular/core';
import { map, finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  Products: Array<Product>;
  filteredProducts: Array<Product>;
  isLoading$ = new BehaviorSubject<boolean>(true);
  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.queryParamMap
      .subscribe(para => {
        const filterParameter = para.get('category');

        this.GetProducts(filterParameter);

      });
  }


  GetProducts(filterParam: string) {
    this.isLoading$.next(true);
    this.productService.GetProducts()
      .pipe(finalize(() => this.isLoading$.next(false)))
      .subscribe(response => {
        this.Products = response.map(product => {
          return new Product(product.payload.val().title,
            product.payload.val().price,
            product.payload.val().category,
            product.payload.val().imageUrl);
        });
        if (this.Products) {
          if (filterParam && filterParam.length > 0) {
            this.CategoryFilter(this.Products, filterParam);
          }
          else {
            this.filteredProducts = this.Products;
          }
        }
        this.isLoading$.next(false);
      });
  }

  CategoryFilter(products: Array<Product>, filterParameter: string) {
    this.isLoading$.next(true);

    if (filterParameter && filterParameter.length > 0) {
      this.filteredProducts = products.filter(x => x.category === filterParameter);

      this.isLoading$.next(false);
    }
  }


}
