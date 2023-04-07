import { TestBed } from '@angular/core/testing';

import { RegisterSetupService } from './register-setup.service';

describe('RegisterSetupService', () => {
  let service: RegisterSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
