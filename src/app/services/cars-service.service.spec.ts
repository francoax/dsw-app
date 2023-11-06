import { TestBed } from '@angular/core/testing';

import { CarsServiceService } from './cars-service.service';

describe('CarsServiceService', () => {
  let service: CarsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
