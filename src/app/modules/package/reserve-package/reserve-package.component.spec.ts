import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservePackageComponent } from './reserve-package.component';

describe('ReservePackageComponent', () => {
  let component: ReservePackageComponent;
  let fixture: ComponentFixture<ReservePackageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservePackageComponent]
    });
    fixture = TestBed.createComponent(ReservePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
