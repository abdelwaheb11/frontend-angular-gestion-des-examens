import { TestBed } from '@angular/core/testing';

import { AuthiserviceService } from './authiservice.service';

describe('AuthiserviceService', () => {
  let service: AuthiserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthiserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
