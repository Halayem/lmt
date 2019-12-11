import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserExperianceListComponent } from './user-experiance-list.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('UserExperianceListComponent', () => {
  let component: UserExperianceListComponent;
  let fixture: ComponentFixture<UserExperianceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [        
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
      ],
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
