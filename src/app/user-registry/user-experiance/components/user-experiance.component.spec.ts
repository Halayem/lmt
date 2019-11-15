import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExperianceComponent } from './user-experiance.component';

describe('UserExperianceComponent', () => {
  let component: UserExperianceComponent;
  let fixture: ComponentFixture<UserExperianceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserExperianceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserExperianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
