import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditProductComponent } from './admin-edit-product.component';

describe('AdminEditProductComponent', () => {
  let component: AdminEditProductComponent;
  let fixture: ComponentFixture<AdminEditProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
