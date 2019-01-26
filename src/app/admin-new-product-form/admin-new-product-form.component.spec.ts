import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewProductFormComponent } from './admin-new-product-form.component';

describe('AdminNewProductFormComponent', () => {
  let component: AdminNewProductFormComponent;
  let fixture: ComponentFixture<AdminNewProductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewProductFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
