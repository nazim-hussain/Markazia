import { TestBed } from '@angular/core/testing';

import { OpenregisterService } from './openregister.service';

describe('OpenregisterService', () => {
  let service: OpenregisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenregisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
