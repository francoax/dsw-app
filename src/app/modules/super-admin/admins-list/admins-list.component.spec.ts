import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsListComponent } from './admins-list.component';

describe('AdminsListComponent', () => {
  let component: AdminsListComponent;
  let fixture: ComponentFixture<AdminsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminsListComponent]
    });
    fixture = TestBed.createComponent(AdminsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
