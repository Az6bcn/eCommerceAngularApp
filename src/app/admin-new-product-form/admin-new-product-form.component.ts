import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-new-product-form',
  templateUrl: './admin-new-product-form.component.html',
  styleUrls: ['./admin-new-product-form.component.css']
})
export class AdminNewProductFormComponent implements OnInit {

  newProductForm: FormGroup;


  constructor(
    private readonly fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.loadForm();
  }

  private loadForm(): void {
    this.newProductForm = AdminNewProductFormComponent.getNewProductForm(this.fb);
  }


  // tslint:disable-next-line:member-ordering
  static getNewProductForm(fb: FormBuilder): FormGroup {
    return fb.group({
      newProductGroup: fb.group ({
        Title: ['', Validators.required, Validators.maxLength(15)],
        Price: ['', Validators.required],
        Category: ['', Validators.required],
        ImageURL: ['', Validators.required]
          })
   });
  }

  IsValid(): boolean {
    return this.newProductForm.invalid;
  }
  Cancelled(): void {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }



  get title() {
    return this.newProductForm.get('newProductGroup.Title');
  }

  get price() {
    return this.newProductForm.get('newProductGroup.Title');
  }

  get category() {
    return this.newProductForm.get('newProductGroup.Category');
  }


  get imageUrl() {
    return this.newProductForm.controls['newProductGroup'].get('ImageURL');
  }
}
