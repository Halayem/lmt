import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExperianceListComponent } from './user-experiance-list.component';

describe('UserExperianceListComponent', () => {
  let component: UserExperianceListComponent;
  let fixture: ComponentFixture<UserExperianceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserExperianceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserExperianceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
