import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableListComponent } from './data-table-list.component';

describe('DataTableComponent', () => {
  let component: DataTableListComponent;
  let fixture: ComponentFixture<DataTableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
