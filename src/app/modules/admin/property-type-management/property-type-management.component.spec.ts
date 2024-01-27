import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTypeManagementComponent } from './property-type-management.component';

describe('PropertyTypeManagementComponent', () => {
  let component: PropertyTypeManagementComponent;
  let fixture: ComponentFixture<PropertyTypeManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropertyTypeManagementComponent]
    });
    fixture = TestBed.createComponent(PropertyTypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
