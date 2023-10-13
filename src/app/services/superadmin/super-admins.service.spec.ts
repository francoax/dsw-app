import { TestBed } from '@angular/core/testing';

import { SuperAdminsService } from './super-admins.service';

describe('SuperAdminsService', () => {
  let service: SuperAdminsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperAdminsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
