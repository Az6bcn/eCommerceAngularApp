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
  productID: string;

  constructor(
    private readonly fb: FormBuilder,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    public productService: ProductService

    ) { }

  ngOnInit() {

    this.categoryService.GetCategories()
      .subscribe( resp => {
        this.categories = resp.map( x => new Category(x.payload.val()['name'], x.payload.key));
      });

      this.productID =  this.activatedRoute.snapshot.paramMap.get('id');

      if (this.productID && this.productID.length > 0) {
        this.loadForm();
        this.productService.GetProduct(this.productID)
        .subscribe((response: Product) => {
          console.log(response);
          // populate the form with data of product to edit
          this.newProductForm.get('newProductGroup').setValue({
            title: response.title,
            price: response.price,
            category: response.category,
            imageUrl: response.imageUrl
          });
        });
      }

      this.loadForm();
  }

  private loadForm(): void {
    this.newProductForm = AdminNewProductFormComponent.getNewProductForm(this.fb);
  }


  // tslint:disable-next-line:member-ordering
  static getNewProductForm(fb: FormBuilder): FormGroup {
    return fb.group({
      newProductGroup: fb.group ({
        title: ['', [Validators.required, Validators.maxLength(15)]],
        price: ['', [Validators.required]],
        category: ['', [Validators.required]],
        imageUrl: ['', [Validators.required]]
          })
   });
  }

  IsValid(): boolean {
    return this.newProductForm.invalid;
  }
  Cancelled(): void {
    this.router.navigate(['../../products'], {relativeTo: this.activatedRoute});
  }

  Save(product: Product) {
    if (this.productID && this.productID.length > 0 ) {
        //edit:
      this.productService.editProduct(product, this.productID);
      alert('Product updated Succesfully');
    }
    else {
      this.productService.CreateProduct(product);
      alert('New product created Succesfully');
    }

    this.router.navigate(['/admin/products'], {relativeTo: this.activatedRoute});
  }

  Delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    if (this.productID && this.productID.length > 0 ) {

      this.productService.deleteProduct(this.productID);
      alert('Product deleted Succesfully');
    }

    this.router.navigate(['/admin/products'], {relativeTo: this.activatedRoute});
  }

  get _title() {
    return this.newProductForm.get('newProductGroup.title');
  }

  get _price() {
    return this.newProductForm.get('newProductGroup.price');
  }

  get _category() {
    return this.newProductForm.get('newProductGroup.category');
  }


  get _imageUrl() {
    return this.newProductForm.controls['newProductGroup'].get('imageUrl');
  }

  parseFormValuesToProduct() {
    return new Product(this._title.value, this._price.value, this._category.value, this._imageUrl.value);

  }
}
