import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBasicInformationComponent } from './user-basic-information.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserBasicInformationComponent', () => {
  let component: UserBasicInformationComponent;
  let fixture: ComponentFixture<UserBasicInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [     
        RouterTestingModule,   
        MaterialModule,
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ UserBasicInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBasicInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
