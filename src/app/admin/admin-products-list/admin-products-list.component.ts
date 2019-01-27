import { ProductService } from './../../Services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/Product';

@Component({
  selector: 'app-admin-products-list',
  templateUrl: './admin-products-list.component.html',
  styleUrls: ['./admin-products-list.component.css']
})
export class AdminProductsListComponent implements OnInit {
Products: Array<Product>;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private productService: ProductService) { }

  ngOnInit() {
    this.productService.GetProducts()
      .subscribe(resp => {
      this.Products = resp;
    });
  }


  navigateToNewForm(): void {
    this.router.navigate(['./new'], {relativeTo: this.activatedRoute});
  }

}
