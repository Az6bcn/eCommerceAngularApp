import { AdminNewProductFormComponent } from './../admin-new-product-form/admin-new-product-form.component';
import { Product } from 'src/app/Models/Product';
import { ProductService } from './../Services/product.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-edit-product',
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.css']
})
export class AdminEditProductComponent extends AdminNewProductFormComponent implements OnInit {

  productID: string;
  productToEdit: Product;
  constructor(// private activatedRoute: ActivatedRoute,
              // private productService: ProductService

              ) { }

  ngOnInit() {

    this.productID =  this.activatedRoute.snapshot.paramMap.get('id');

    this.productService.GetProduct(this.productID)
      .subscribe(response => {
        console.log(response);
      });


  }

}
