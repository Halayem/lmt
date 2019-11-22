import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAuthentificationComponent } from './user-authentification.component';

describe('UserAuthentificationComponent', () => {
  let component: UserAuthentificationComponent;
  let fixture: ComponentFixture<UserAuthentificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAuthentificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAuthentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
