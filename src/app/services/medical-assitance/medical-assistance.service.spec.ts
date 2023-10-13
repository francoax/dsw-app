import { TestBed } from '@angular/core/testing';

import { MedicalAssistanceService } from './medical-assistance.service';

describe('MedicalAssistanceService', () => {
  let service: MedicalAssistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalAssistanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
