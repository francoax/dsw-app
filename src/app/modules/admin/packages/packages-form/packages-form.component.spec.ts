import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesFormComponent } from './packages-form.component';

describe('PackagesFormComponent', () => {
  let component: PackagesFormComponent;
  let fixture: ComponentFixture<PackagesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackagesFormComponent]
    });
    fixture = TestBed.createComponent(PackagesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
