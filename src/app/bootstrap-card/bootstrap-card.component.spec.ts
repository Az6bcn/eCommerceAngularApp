import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootstrapCardComponent } from './bootstrap-card.component';

describe('BootstrapCardComponent', () => {
  let component: BootstrapCardComponent;
  let fixture: ComponentFixture<BootstrapCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootstrapCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootstrapCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
