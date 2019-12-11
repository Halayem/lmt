import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInformationComponent } from './user-information.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserBasicInformationComponent } from '../user-basic-information/components/user-basic-information.component';
import { UserExperianceComponent } from '../user-experiance/components/user-experiance.component';
import { UserExperianceListComponent } from '../user-experiance/components/user-experiance-list/user-experiance-list.component';
import { UserProjectComponent } from '../user-project/components/user-project.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { LmtAutocompleteComponent } from 'src/app/shared/components/lmt-autocomplete/lmt-autocomplete.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserInformationComponent', () => {
  let component: UserInformationComponent;
  let fixture: ComponentFixture<UserInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [    
        RouterTestingModule,    
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        AngularEditorModule
      ],
      declarations: [ UserInformationComponent,
      UserBasicInformationComponent ,LmtAutocompleteComponent, UserExperianceComponent, UserExperianceListComponent, UserProjectComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
