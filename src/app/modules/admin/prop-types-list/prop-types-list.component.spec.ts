import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropTypesListComponent } from './prop-types-list.component';

describe('PropTypesListComponent', () => {
  let component: PropTypesListComponent;
  let fixture: ComponentFixture<PropTypesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropTypesListComponent]
    });
    fixture = TestBed.createComponent(PropTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
