import { TestBed } from '@angular/core/testing';

import { RegisterSettlementService } from './register-settlement.service';

describe('RegisterSettlementService', () => {
  let service: RegisterSettlementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterSettlementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
