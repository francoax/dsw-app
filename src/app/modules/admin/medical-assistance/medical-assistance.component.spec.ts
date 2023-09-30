import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalAssistanceComponent } from './medical-assistance.component';

describe('MedicalAssistanceComponent', () => {
  let component: MedicalAssistanceComponent;
  let fixture: ComponentFixture<MedicalAssistanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalAssistanceComponent]
    });
    fixture = TestBed.createComponent(MedicalAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
