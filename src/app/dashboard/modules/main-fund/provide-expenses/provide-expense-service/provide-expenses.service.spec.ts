import { TestBed } from '@angular/core/testing';

import { ProvideExpensesService } from './provide-expenses.service';

describe('ProvideExpensesService', () => {
  let service: ProvideExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvideExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
