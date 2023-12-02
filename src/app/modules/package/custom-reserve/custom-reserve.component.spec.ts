import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomReserveComponent } from './custom-reserve.component';

describe('CustomReserveComponent', () => {
  let component: CustomReserveComponent;
  let fixture: ComponentFixture<CustomReserveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomReserveComponent]
    });
    fixture = TestBed.createComponent(CustomReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
