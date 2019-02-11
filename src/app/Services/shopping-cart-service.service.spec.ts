import { TestBed } from '@angular/core/testing';

import { ShoppingCartServiceService } from './shopping-cart-service.service';

describe('ShoppingCartServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShoppingCartServiceService = TestBed.get(ShoppingCartServiceService);
    expect(service).toBeTruthy();
  });
});
