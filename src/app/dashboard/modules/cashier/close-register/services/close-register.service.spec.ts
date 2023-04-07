import { TestBed } from '@angular/core/testing';

import { CloseRegisterService } from './close-register.service';

describe('CloseRegisterService', () => {
  let service: CloseRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
