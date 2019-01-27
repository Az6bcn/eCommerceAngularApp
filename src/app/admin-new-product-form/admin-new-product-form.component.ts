import { ProductService } from './../Services/product.service';
import { Product } from './../Models/Product';
import { Category } from './../Models/category';
import { CategoryService } from './../Services/category.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-admin-new-product-form',
  templateUrl: './admin-new-product-form.component.html',
  styleUrls: ['./admin-new-product-form.component.css']
})
export class AdminNewProductFormComponent implements OnInit {

  newProductForm: FormGroup;
  categories: Array<Category>;

  constructor(
    private readonly fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService

    ) { }

  ngOnInit() {
    this.loadForm();

    this.categoryService.GetCategories()
      .subscribe( resp => {
        this.categories = resp.map( x => new Category(x.payload.val().name, x.payload.key));
      });


  }

  private loadForm(): void {
    this.newProductForm = AdminNewProductFormComponent.getNewProductForm(this.fb);
  }


  // tslint:disable-next-line:member-ordering
  static getNewProductForm(fb: FormBuilder): FormGroup {
    return fb.group({
      newProductGroup: fb.group ({
        Title: ['', [Validators.required, Validators.maxLength(15)]],
        Price: ['', [Validators.required]],
        Category: ['', [Validators.required]],
        ImageURL: ['', [Validators.required]]
          })
   });
  }

  IsValid(): boolean {
    return this.newProductForm.invalid;
  }
  Cancelled(): void {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  Save(product: Product) {
    this.productService.CreateProduct(product);
    alert('New product created Succesfully');
    this.router.navigate(['/admin/products'], {relativeTo: this.activatedRoute});
  }


  get title() {
    return this.newProductForm.get('newProductGroup.Title');
  }

  get price() {
    return this.newProductForm.get('newProductGroup.Price');
  }

  get category() {
    return this.newProductForm.get('newProductGroup.Category');
  }


  get imageUrl() {
    return this.newProductForm.controls['newProductGroup'].get('ImageURL');
  }
}
