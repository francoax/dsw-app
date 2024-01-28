import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReservesSkeletonComponent } from './user-reserves-skeleton.component';

describe('UserReservesSkeletonComponent', () => {
  let component: UserReservesSkeletonComponent;
  let fixture: ComponentFixture<UserReservesSkeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserReservesSkeletonComponent]
    });
    fixture = TestBed.createComponent(UserReservesSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
