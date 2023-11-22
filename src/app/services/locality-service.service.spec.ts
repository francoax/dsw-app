import { TestBed } from '@angular/core/testing';

import { LocalityServiceService } from './locality-service.service';

describe('LocalityServiceService', () => {
  let service: LocalityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
